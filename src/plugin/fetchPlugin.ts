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

        if (!isExist) {
          const { data, request } = await axios.get<string>(args.path);
          const isCss = /\.css$/.test(args.path);
          const escaped = data
            .replace(/\n/g, "")
            .replace(/"/g, '\\"')
            .replace(/'/g, "\\'");
          const temp: esbuild.OnLoadResult = {
            loader: "jsx",
            contents: isCss
              ? `const style = document.createElement('style');
                style.innerText = '${escaped}';
                document.head.appendChild(style);`
              : data,
            resolveDir: new URL("./", request.responseURL).pathname,
          };

          await fileCache.setItem<esbuild.OnLoadResult>(args.path, temp);

          return temp;
        }
        return isExist;
      });
    },
  };
};
