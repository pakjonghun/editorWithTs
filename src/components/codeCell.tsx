import React, { FC, useState } from "react";
import CodeEditor from "./codeEditor";
import PreviewComponent from "./preview";
import Resizable from "./resizable";

const CodeCell: FC = () => {
  const [rawCode, setRawCode] = useState("");
  const [translatedCode, setTranslatedCode] = useState<string>("");

  return (
    <Resizable height={500} width={Infinity} direction="vertical">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
      >
        <CodeEditor
          initialValue="Default"
          onChange={setRawCode}
          value={rawCode}
          setChanged={setTranslatedCode}
        />
        <PreviewComponent code={translatedCode} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
