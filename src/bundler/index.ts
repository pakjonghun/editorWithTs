import * as esbuild from "esbuild-wasm";
import { fetchPlugin } from "./plugin/fetchPlugin";
import { unpkgPathPlugin } from "./plugin/unpkg.path.plugin";
type bundleReturnType = {
  code: string;
  error: string;
};
let builder: esbuild.Service;
const getBundled = async (rawCode: string): Promise<bundleReturnType> => {
  try {
    if (!builder) {
      builder = await esbuild.startService({
        worker: true,
        wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
      });
    }

    const result = await builder.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    return {
      code: result.outputFiles[0].text,
      error: "",
    };
  } catch (err: any) {
    return {
      code: "",
      error: err.message,
    };
  }
};

export default getBundled;
