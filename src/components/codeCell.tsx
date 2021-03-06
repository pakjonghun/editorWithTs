import React, { FC, useState } from "react";

import CodeEditor from "./codeEditor";
import PreviewComponent from "./preview";
import Resizable from "./resizable";

const CodeCell: FC = () => {
  const [rawCode, setRawCode] = useState("");
  const [translatedCode, setTranslatedCode] = useState<string>("");
  const [err, setErr] = useState<string>("");

  return (
    <Resizable direction="vertical">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="Default"
            onChange={setRawCode}
            setError={setErr}
            value={rawCode}
            setChanged={setTranslatedCode}
          />
        </Resizable>
        <PreviewComponent err={err} code={translatedCode} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
