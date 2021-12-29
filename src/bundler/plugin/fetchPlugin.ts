import axios from "axios";
import * as esbuild from "esbuild-wasm";
import { createInstance } from "localforage";

const fileCache = createInstance({
  name: "fileCache",
});

export const fetchPlugin = (code: string) => {
  return {
    name: "fetchPlugin",
    setup: (build: esbuild.PluginBuild) => {
      build.onLoad({ filter: /(^index\.js$)/ }, (args: any) => {
        return {
          loader: "jsx",
          contents: code,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const isExist = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (isExist) return isExist;
        return null;
      });

      build.onLoad({ filter: /\.css$/ }, async (args: any) => {
        const result = await commonOnLoad(args.path);
        if (typeof result.contents !== "string") return;

        const escaped = result.contents
          .replace(/\n/g, "")
          .replace(/'/g, "//'")
          .replace(/"/g, '//"');

        const cssState = `
        const style = document.createElement('style');
        style.innerText = '${escaped}'
        document.head.appendChild(style);
        `;

        result.contents = cssState;
        await fileCache.setItem<esbuild.OnLoadResult>(args.path, result);
        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const result = await commonOnLoad(args.path);
        await fileCache.setItem<esbuild.OnLoadResult>(args.path, result);
        return result;
      });
    },
  };
};

async function commonOnLoad(path: string) {
  const { data, request } = await axios.get<string>(path);

  const temp: esbuild.OnLoadResult = {
    loader: "jsx",
    contents: data,
    resolveDir: new URL("./", request.responseURL).pathname,
  };

  return temp;
}
