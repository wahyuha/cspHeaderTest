import path from "path";
import alias from "@rollup/plugin-alias";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import url from "@rollup/plugin-url";
import svelte from "rollup-plugin-svelte";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import { aliasExternal } from "rollup-plugin-aliasexternal";
import { terser } from "rollup-plugin-terser";
import loadDotEnv from "./src/configs/envar";
import config from "sapper/config/rollup.js";
import pkg from "./package.json";

const mode = process.env.NODE_ENV;
const dev = mode === "development";
const legacy = !!process.env.SAPPER_LEGACY_BUILD;
const projectRootDir = path.resolve(__dirname);

const commitHash = require("child_process")
  .execSync("git rev-parse --short HEAD")
  .toString()
  .trim();

const onwarn = (warning, onwarn) =>
  (warning.code === "MISSING_EXPORT" && /'preload'/.test(warning.message)) ||
  (warning.code === "CIRCULAR_DEPENDENCY" &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
  (warning.code === "PLUGIN_WARNING" &&
    warning.pluginCode &&
    warning.pluginCode === "a11y-no-onchange") ||
  warning.code === "EVAL" ||
  warning.code === "MISSING_MODULE" ||
  onwarn(warning);

export default {
  client: {
    input: config.client.input(),
    output: {
      ...config.client.output(),
      entryFileNames: `[name].${commitHash}.js`,
      chunkFileNames: `[name].${commitHash}.js`,
      sourcemap: true,
    },
    plugins: [
      replace({
        ...loadDotEnv(),
        preventAssignment: true,
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
      svelte({
        dev,
        hydratable: true,
        emitCss: true,
      }),
      url({
        sourceDir: path.resolve(__dirname, "src/node_modules/images"),
        publicPath: "/client/",
      }),
      resolve({
        browser: true,
        dedupe: ["svelte"],
      }),
      commonjs(),
      aliasExternal("seruni", [
        {
          find: "@components",
          replacement: path.resolve(
            projectRootDir,
            "node_modules/seruni/src/components"
          ),
        },
        {
          find: "@constants",
          replacement: path.resolve(
            projectRootDir,
            "node_modules/seruni/src/constants"
          ),
        },
        {
          find: "@stores",
          replacement: path.resolve(
            projectRootDir,
            "node_modules/seruni/src/stores"
          ),
        },
        {
          find: "@utils",
          replacement: path.resolve(
            projectRootDir,
            "node_modules/seruni/src/utils"
          ),
        },
        {
          find: "@helpers",
          replacement: path.resolve(
            projectRootDir,
            "node_modules/seruni/src/helpers"
          ),
        },
      ]),
      alias({
        resolve: [".jsx", ".js", ".svelte", ".json"],
        entries: {
          "~": __dirname,
          "@": __dirname + "/src",
          "@configs": __dirname + "/src/configs",
          "@constants": __dirname + "/src/constants",
          "@components": __dirname + "/src/components",
          "@helpers": __dirname + "/src/helpers",
          "@middlewares": __dirname + "/src/server/middleware",
          "@routes": __dirname + "/src/routes",
          "@server": __dirname + "/src/server",
          "@stores": __dirname + "/src/stores",
          "@utils": __dirname + "/src/utils",
        },
      }),

      legacy &&
        babel({
          extensions: [".js", ".mjs", ".html", ".svelte"],
          babelHelpers: "runtime",
          exclude: ["node_modules/@babel/**"],
          presets: [
            [
              "@babel/preset-env",
              {
                targets: "> 0.25%, not dead",
              },
            ],
          ],
          plugins: [
            "@babel/plugin-syntax-dynamic-import",
            [
              "@babel/plugin-transform-runtime",
              {
                useESModules: true,
              },
            ],
          ],
        }),

      !dev &&
        terser({
          module: true,
        }),
    ],

    preserveEntrySignatures: false,
    onwarn,
  },

  server: {
    input: config.server.input(),
    output: {
      ...config.server.output(),
      sourcemap: true,
    },
    plugins: [
      aliasExternal("seruni", [
        {
          find: "@components",
          replacement: path.resolve(
            projectRootDir,
            "node_modules/seruni/src/components"
          ),
        },
        {
          find: "@constants",
          replacement: path.resolve(
            projectRootDir,
            "node_modules/seruni/src/constants"
          ),
        },
        {
          find: "@stores",
          replacement: path.resolve(
            projectRootDir,
            "node_modules/seruni/src/stores"
          ),
        },
        {
          find: "@utils",
          replacement: path.resolve(
            projectRootDir,
            "node_modules/seruni/src/utils"
          ),
        },
        {
          find: "@helpers",
          replacement: path.resolve(
            projectRootDir,
            "node_modules/seruni/src/helpers"
          ),
        },
      ]),
      alias({
        resolve: [".jsx", ".js", ".svelte", ".json"],
        entries: {
          "~": __dirname,
          "@": __dirname + "/src",
          "@configs": __dirname + "/src/configs",
          "@constants": __dirname + "/src/constants",
          "@components": __dirname + "/src/components",
          "@helpers": __dirname + "/src/helpers",
          "@middlewares": __dirname + "/src/server/middlewares",
          "@routes": __dirname + "/src/routes",
          "@server": __dirname + "/src/server",
          "@stores": __dirname + "/src/stores",
          "@utils": __dirname + "/src/utils",
        },
      }),
      replace({
        ...loadDotEnv(),
        preventAssignment: true,
        "process.browser": false,
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
      svelte({
        generate: "ssr",
        hydratable: true,
        dev,
      }),
      // url({
      //   sourceDir: path.resolve(__dirname, "src/node_modules/images"),
      //   publicPath: "/client/",
      //   emitFiles: false, // already emitted by client build
      // }),
      resolve({
        dedupe: ["svelte"],
      }),
      json(),
      commonjs(),
    ],
    external: Object.keys(pkg.dependencies).concat(
      require("module").builtinModules ||
        Object.keys(process.binding("natives"))
    ),

    preserveEntrySignatures: "strict",
    onwarn,
  },

  // serviceworker: {
  // 	input: config.serviceworker.input(),
  // 	output: config.serviceworker.output(),
  // 	plugins: [
  // 		resolve(),
  // 		replace({
  // 			'process.browser': true,
  // 			'process.env.NODE_ENV': JSON.stringify(mode)
  // 		}),
  // 		commonjs(),
  // 		!dev && terser()
  // 	],

  // 	preserveEntrySignatures: false,
  // 	onwarn,
  // }
};
