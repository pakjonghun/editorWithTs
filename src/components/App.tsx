import React, { FC } from "react";

import { useSelector } from "react-redux";
import { rootReducerType } from "../store/reducer";
import PrintWindow from "./PrintWindow";
import Textarea from "./Textarea";
const App: FC = () => {
  const code = useSelector<rootReducerType, string>(
    (state) => state.code.data.data
  );

  return (
    <>
      <Textarea />
      <PrintWindow code={code} />
      <pre>{code}</pre>
    </>
  );
};

export default App;
