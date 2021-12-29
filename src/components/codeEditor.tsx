import Editor, { EditorProps, useMonaco } from "@monaco-editor/react";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import useOnBundle from "../hooks/useOnBundle";
import useOnChange from "../hooks/useOnChange";
import { fetchPlugin } from "../plugin/fetchPlugin";
import { unpkgPathPlugin } from "../plugin/unpkg.path.plugin";
import { codeActions } from "../store/reducer/code";

type CodeEditorProps = {
  initialValue: string;
  onChange: (value: string) => void;
  value: string;
  html: string;
  iframe: any;
};

const CodeEditor: FC<CodeEditorProps> = ({
  initialValue,
  onChange,
  value,
  html,
  iframe,
}) => {
  const { builder } = useOnBundle();
  const dispatch = useDispatch();

  const onClick = async () => {
    if (!builder.current || !iframe.current) return;

    iframe.current.srcdoc = html;

    const translated = await builder.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(value)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    dispatch(
      codeActions.insertRequest({ code: translated.outputFiles[0].text })
    );
  };

  return (
    <div>
      <Editor
        onChange={(value) => value && onChange(value)}
        defaultValue={initialValue}
        value={value}
        options={{
          wordWrap: "on",
          minimap: {
            enabled: false,
          },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 2,
          fontSize: 16,
          scrollBeyondLastLine: true,
          automaticLayout: true,
        }}
        width={"50vw"}
        theme="vs-dark"
        height={"50vh"}
        language="javascript"
      />
      <button onClick={() => onClick()}>submit</button>
    </div>
  );
};

export default CodeEditor;
