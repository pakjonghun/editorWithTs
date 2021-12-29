import { useRef } from "react";
import { useEffect } from "react";
import * as esbuild from "esbuild-wasm";

const useOnBundle = () => {
  const builder = useRef<any>("");

  const startService = async () => {
    builder.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  return { builder };
};

export default useOnBundle;
