import { createMDX } from 'fumadocs-mdx/next';
import stylexUnplugin from '@stylexjs/unplugin';
import path from 'node:path';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ['@basex-ui/tokens', '@basex-ui/styles', '@basex-ui/components'],
  webpack(webpackConfig) {
    webpackConfig.plugins.push(
      stylexUnplugin.webpack({
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
        cssInjectionTarget: (filepath) => filepath.includes('layout'),
      }),
    );
    return webpackConfig;
  },
};

export default withMDX(config);
