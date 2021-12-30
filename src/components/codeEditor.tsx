import React, { FC, useEffect } from "react";
import "../style/codeEditor.css";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import Editor from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import bundler from "../bundler";

type setFunc<T> = (value: T) => void;

type CodeEditorProps = {
  initialValue: string;
  onChange: setFunc<string>;
  setChanged: setFunc<string>;
  setError: setFunc<string>;
  value: string;
};

const CodeEditor: FC<CodeEditorProps> = ({
  initialValue,
  onChange,
  setError,
  value,
  setChanged,
}) => {
  const onClick = async () => {
    const { code, error } = await bundler(value);
    code && setChanged(code);
    error && setError(error);
  };

  const onFormatClick = () => {
    const translated = prettier
      .format(value, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/g, "");

    onChange(translated);
  };

  useEffect(() => {
    const timer = setTimeout(() => setChanged(value), 1000);
    return () => clearTimeout(timer);
  }, [value, setChanged]);

  return (
    <div className="editorWrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={() => {
          onFormatClick();
        }}
      >
        Format
      </button>
      <Editor
        onChange={(value) => {
          value && onChange(value);
        }}
        defaultValue={initialValue}
        value={value}
        options={{
          tabSize: 2,
          wordWrap: "on",
          minimap: {
            enabled: false,
          },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 2,
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        height={"100%"}
        theme="vs-dark"
        language="javascript"
      />
    </div>
  );
};

export default CodeEditor;
