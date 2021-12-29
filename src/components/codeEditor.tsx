import "../style/codeEditor.css";
import codeShift from "jscodeshift";
import HighLighter from "monaco-jsx-highlighter";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import Editor, { EditorProps, useMonaco } from "@monaco-editor/react";
import React, { FC, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import useOnBundle from "../hooks/useOnBundle";
import useOnChange from "../hooks/useOnChange";
import { fetchPlugin } from "../plugin/fetchPlugin";
import { unpkgPathPlugin } from "../plugin/unpkg.path.plugin";
import { codeActions } from "../store/reducer/code";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import bundler from "../bundler";

type CodeEditorProps = {
  initialValue: string;
  onChange: (value: string) => void;
  value: string;
};

const CodeEditor: FC<CodeEditorProps> = ({ initialValue, onChange, value }) => {
  const dispatch = useDispatch();

  const onClick = async () => {
    const code = await bundler(value);
    dispatch(codeActions.insertRequest({ code }));
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
        onChange={(value, editor) => {
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
