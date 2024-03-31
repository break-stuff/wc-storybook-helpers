# Web Component Storybook Helpers

This is a simple example of how to use the [Web Component Storybook Helpers](https://www.npmjs.com/package/wc-storybook-helpers) in a web component implementation of [Storybook](https://storybook.js.org/docs/get-started/web-components-vite). 

Some other technologies used in here are: 

- [Lit](https://lit.dev/) to author components, but it can be used with any web component library or compiler
- [Custom Elements Manifest Analyzer](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/) for generating the CEM.
- [CEM Analyzer Expanded Types](https://www.npmjs.com/package/cem-plugin-expanded-types) to parse the TypeScript types to create options in the controls
- [npm-run-all](https://www.npmjs.com/package/npm-run-all) to run Storybook and the CEM Analyzer watcher at the same time

## Run the Project

To run the project, install the dependencies and run the `dev` script.

```bash
npm install && npm run dev
```
