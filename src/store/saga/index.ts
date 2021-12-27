import { fork, all } from "redux-saga/effects";
import code from "./code";

export default function* rootSaga() {
  yield all([fork(code)]);
}
