import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "fileCahce",
});

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("resolve", args);
        if (args.path === "index.js") {
          return { path: args.path, namespace: "a" };
        }

        const regExp = /(\.\/)|(\.\.\/)/;
        const baseUrl = "https://unpkg.com";
        if (regExp.test(args.path)) {
          const url = new URL(args.path, baseUrl + args.resolveDir + "/");

          return {
            path: url.href,
            namespace: "a",
          };
        }

        return {
          path: baseUrl + "/" + args.path,
          namespace: "a",
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onload", args);
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
              import React,{useState} from 'react-select'
              
              console.log(React,useState);
            `,
          };
        }
        const { data, request } = await axios.get(args.path);

        return {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
      });
    },
  };
};
