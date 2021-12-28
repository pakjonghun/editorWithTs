import React, { useCallback, useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { useDispatch } from "react-redux";
import { codeActions } from "../store/reducer/code";
import { unpkgPathPlugin } from "../plugin/unpkg.path.plugin";
import { fetchPlugin } from "../plugin/fetchPlugin";

const Textarea: React.FC = () => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const startService = async () => {
      ref.current = await esbuild.startService({
        worker: true,
        wasmURL: "/esbuild.wasm",
      });
    };
    startService();
  }, []);

  const [code, setCode] = useState("");
  const dispatch = useDispatch();

  const onSubmit = useCallback(async () => {
    if (!ref.current) return;

    const a = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(code)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    dispatch(codeActions.insertRequest({ code: a.outputFiles[0].text }));
  }, [dispatch, code]);

  const onChange = useCallback(
    (value: string) => {
      setCode(value);
    },
    [setCode]
  );

  return (
    <>
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <textarea
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            onChange(event.target.value)
          }
          value={code}
        />

        <button>click</button>
      </form>
    </>
  );
};

export default Textarea;
