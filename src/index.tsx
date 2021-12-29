import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import CodeCell from "./components/codeCell";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <CodeCell />
  </Provider>,
  document.getElementById("root")
);
