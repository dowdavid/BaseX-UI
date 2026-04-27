# @basex-ui/cli

Scaffolding CLI for [BaseX UI](https://github.com/dowdavid/BaseX-UI). Initialize a project, add components, switch themes, and list what's available.

## Install

```bash
npm install -g @basex-ui/cli
# or use without installing
npx @basex-ui/cli <command>
```

## Commands

```bash
basex-ui init                # set up BaseX UI in the current project
basex-ui add <component>     # add a component (e.g. basex-ui add button)
basex-ui list                # list all available components
basex-ui theme <name>        # switch or apply a theme
```

## Example

```bash
cd my-vite-app
basex-ui init
basex-ui add button accordion dialog
```

The CLI installs the right packages, sets up StyleX, applies the default theme, and copies any component-specific assets you opt in to.

## License

MIT — see the [main repo](https://github.com/dowdavid/BaseX-UI).
