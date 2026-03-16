import { createMDX } from 'fumadocs-mdx/next';
import stylexUnplugin from '@stylexjs/unplugin';
import path from 'node:path';

const withMDX = createMDX();

const stylexOptions = {
  useCSSLayers: true,
  unstable_moduleResolution: {
    type: 'commonJS',
    rootDir: path.resolve(import.meta.dirname, '../..'),
    themeFileExtension: '',
  },
  externalPackages: [
    '@basex-ui/tokens',
    '@basex-ui/styles',
    '@basex-ui/components',
  ],
};

/**
 * Creates a CSS asset early in the compilation so StyleX can inject into it.
 * Next.js creates CSS assets after PROCESS_ASSETS_STAGE_SUMMARIZE (where StyleX
 * tries to inject). This plugin creates a placeholder at ADDITIONAL stage
 * (which runs before SUMMARIZE), so StyleX finds a target.
 *
 * After StyleX injects, the plugin at REPORT stage merges the StyleX CSS
 * into the real Next.js CSS asset and removes the placeholder.
 */
class StyleXCSSBridge {
  static PLACEHOLDER = 'static/css/stylex-bridge.css';

  apply(compiler) {
    const wp = compiler.webpack;
    const RawSource = wp.sources.RawSource;

    compiler.hooks.thisCompilation.tap('StyleXCSSBridge', (compilation) => {
      // Create placeholder CSS asset BEFORE StyleX's SUMMARIZE stage
      compilation.hooks.processAssets.tap(
        {
          name: 'StyleXCSSBridge:create',
          stage: wp.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        () => {
          compilation.emitAsset(
            StyleXCSSBridge.PLACEHOLDER,
            new RawSource('/* StyleX bridge */\n')
          );
        }
      );

      // After all processing, merge StyleX CSS into the real layout CSS
      compilation.hooks.processAssets.tap(
        {
          name: 'StyleXCSSBridge:merge',
          stage: wp.Compilation.PROCESS_ASSETS_STAGE_REPORT,
        },
        (assets) => {
          const bridge = compilation.getAsset(StyleXCSSBridge.PLACEHOLDER);
          if (!bridge) return;

          const bridgeCSS = bridge.source.source().toString();
          // Check if StyleX actually injected something beyond the placeholder
          if (bridgeCSS === '/* StyleX bridge */\n') {
            // Nothing was injected, clean up
            compilation.deleteAsset(StyleXCSSBridge.PLACEHOLDER);
            return;
          }

          // Strip the placeholder comment, keep the StyleX CSS
          const stylexCSS = bridgeCSS.replace('/* StyleX bridge */\n', '');
          if (!stylexCSS.trim()) {
            compilation.deleteAsset(StyleXCSSBridge.PLACEHOLDER);
            return;
          }

          // Find the real CSS asset to inject into
          const cssAssets = Object.keys(assets).filter(
            (f) => f.endsWith('.css') && f !== StyleXCSSBridge.PLACEHOLDER
          );
          const target = cssAssets.find((f) => f.includes('layout')) || cssAssets[0];

          if (target) {
            const existing = compilation.getAsset(target).source.source().toString();
            compilation.updateAsset(target, new RawSource(existing + '\n' + stylexCSS));
            console.log(`[StyleX] Injected ${stylexCSS.length} chars into ${target}`);
          } else {
            // No real CSS asset yet — keep the bridge asset as-is
            // (Next.js will serve it)
            console.log(`[StyleX] No layout CSS found, keeping bridge asset (${stylexCSS.length} chars)`);
            compilation.updateAsset(StyleXCSSBridge.PLACEHOLDER, new RawSource(stylexCSS));
            return;
          }

          // Remove the placeholder
          compilation.deleteAsset(StyleXCSSBridge.PLACEHOLDER);
        }
      );
    });
  }
}

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ['@basex-ui/tokens', '@basex-ui/styles', '@basex-ui/components'],
  webpack(webpackConfig, { isServer }) {
    if (!isServer) {
      // 1. Bridge creates a placeholder CSS asset early
      webpackConfig.plugins.push(new StyleXCSSBridge());

      // 2. StyleX transforms JS and injects CSS into the placeholder
      webpackConfig.plugins.push(
        stylexUnplugin.webpack({
          ...stylexOptions,
          cssInjectionTarget: (filepath) =>
            filepath === StyleXCSSBridge.PLACEHOLDER,
        })
      );
    } else {
      // Server only needs JS transformation
      webpackConfig.plugins.push(
        stylexUnplugin.webpack({
          ...stylexOptions,
          cssInjectionTarget: () => false,
        })
      );
    }

    return webpackConfig;
  },
};

export default withMDX(config);
