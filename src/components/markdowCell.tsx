import React, { useState, FC, useCallback } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useEffect } from "react";
import { useRef } from "react";
import "../style/markdownCell.css";

const MarkdownCell: FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>("**Hello world!!!**");
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      )
        return;
      setMode(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () => document.removeEventListener("click", listener);
  }, []);

  const onClick = () => setMode(true);

  if (mode) {
    return (
      <div ref={ref} className="editorWindow">
        <MDEditor
          value={value}
          onChange={(value) => setValue(value ? value : "")}
        />
      </div>
    );
  }

  return (
    <div
      className="editorWindow"
      onClick={() => onClick()}
      style={{ backgroundColor: "red" }}
    >
      <div className="innerCard">
        <MDEditor.Markdown
          source={`# Header \n ${value}`}
          style={{ backgroundColor: "#37414b" }}
        />
      </div>
    </div>
  );
};

export default MarkdownCell;
