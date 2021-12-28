import { fork, all } from "redux-saga/effects";
import code from "./code";
import html from "./html";

export default function* rootSaga() {
  yield all([fork(code), fork(html)]);
}
