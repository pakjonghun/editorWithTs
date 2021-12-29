import React, { FC, useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import useOnChange from "../hooks/useOnChange";
import { rootReducerType } from "../store/reducer";
import CodeEditor from "./codeEditor";
import PreviewComponent from "./preview.component";
const App: FC = () => {
  const { value, onChange } = useOnChange("");
  const code = useSelector<rootReducerType, string>(
    (state) => state.code.data.data
  );

  return (
    <>
      <CodeEditor initialValue="Default" onChange={onChange} value={value} />
      <PreviewComponent code={code} />
    </>
  );
};

export default App;
