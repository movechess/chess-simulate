import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";

import scss from "rollup-plugin-scss";
import sass from "sass";
import {terser} from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";

export default (args) => ({
  input: "src/main.ts",

  external: [
    "@polkadot/x-textencoder",
    "@polkadot/x-ws",
    "@polkadot/wasm-crypto-init",
    "@polkadot/x-randomvalues",
    "@polkadot/x-textdecoder",
    "@polkadot/x-fetch",
  ],
  output: {
    file: args["config-prod"] ? "dist/index.min.js" : "index.js",
    format: "iife",
    name: "LichessDemo",
    global: {
      "@polkadot/x-textencoder": "xTextencoder",
      "@polkadot/x-ws": "xWs",
      "@polkadot/wasm-crypto-init": "wasmCryptoInit",
      "@polkadot/x-randomvalues": "xRandomvalues",
      "@polkadot/x-textdecoder": "xTextdecoder",
      "@polkadot/x-fetch": "xFetch",
    },
    plugins: args["config-prod"]
      ? [
          terser({
            safari10: false,
            output: {comments: false},
          }),
        ]
      : [],
  },
  plugins: [
    resolve({
      moduleDirectories: ["node_modules"],
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    typescript(),
    commonjs(),
    scss({
      include: ["scss/*"],
      output: args["config-prod"] ? "./dist/style.min.css" : "./style.css",
      runtime: sass,
      ...(args["config-prod"] ? {outputStyle: "compressed"} : {}),
    }),
  ],
});
