import React, { FC, useEffect } from "react";
import "../style/codeEditor.css";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import Editor from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import bundler from "../bundler";

type CodeEditorProps = {
  initialValue: string;
  onChange: (value: string) => void;
  setChanged: (value: string) => void;
  value: string;
};

const CodeEditor: FC<CodeEditorProps> = ({
  initialValue,
  onChange,
  value,
  setChanged,
}) => {
  const onClick = async () => {
    const code = await bundler(value);
    setChanged(code);
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
    const timer = setTimeout(() => setChanged(value), 500);
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
      <button className="submitButton" onClick={() => onClick()}>
        submit
      </button>
    </div>
  );
};

export default CodeEditor;
