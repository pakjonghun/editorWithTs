import React, { FC } from "react";
import { useSelector } from "react-redux";
import { rootReducerType } from "../store/reducer";
import PrintWindow from "./PrintWindow";
import Textarea from "./testarea";
const App: FC = () => {
  const code = useSelector<rootReducerType, string>(
    (state) => state.code.data.data
  );
  return (
    <>
      <h1>{code}</h1>
      <Textarea />
      <PrintWindow code={code} />
    </>
  );
};

export default App;
