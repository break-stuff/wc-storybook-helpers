import { getTsProgram, expandTypesPlugin } from "cem-plugin-expanded-types";

export default {
  /** Globs to analyze */
  globs: ["src/my-element.ts"],
  /** Globs to exclude */
  exclude: ["src/**/*.stories.ts"],
  /** Directory to output CEM to */
  outdir: "/",
  /** Run in dev mode, provides extra logging */
  dev: false,
  /** Run in watch mode, runs on file changes */
  watch: false,
  /** Include third party custom elements manifests */
  dependencies: true,
  /** Output CEM path to `package.json`, defaults to true */
  packagejson: false,
  /** Enable special handling for litelement */
  litelement: true,
  
  overrideModuleCreation: ({ts, globs}) => {
    const program = getTsProgram(ts, globs, "tsconfig.json");
    return program
      .getSourceFiles()
      .filter((sf) => globs.find((glob) => sf.fileName.includes(glob)));
  },

  /** Provide custom plugins */
  plugins: [expandTypesPlugin()],};
