import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import CodeCell from "./components/codeCell";
import MarkdownCell from "./components/markdowCell";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <CodeCell />
    <MarkdownCell />
  </Provider>,
  document.getElementById("root")
);
