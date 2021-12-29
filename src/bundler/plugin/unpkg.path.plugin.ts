import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      const baseUrl = "https://unpkg.com";

      //handle root entry file
      build.onResolve({ filter: /(^index\.js$)/ }, async (args: any) => {
        return { path: args.path, namespace: "a" };
      });

      //handle relative paths in module
      build.onResolve({ filter: /(^\.\/)|(^\.\/\/)/ }, (args: any) => {
        return {
          path: new URL(args.path, baseUrl + args.resolveDir + "/").href,
          namespace: "a",
        };
      });

      //handle mainfiles in module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          path: baseUrl + "/" + args.path,
          namespace: "a",
        };
      });
    },
  };
};
