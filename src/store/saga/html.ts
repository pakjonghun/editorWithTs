import { RequestPayload } from "./../types";
import { rootReducerType } from "./../reducer/index";
import { takeLatest, put, fork, all } from "redux-saga/effects";
import { htmlActions, HtmlType } from "./../reducer/html";

function htmlInsert(html: string): HtmlType {
  return {
    data: html,
    id: "1",
  };
}

function* insert({ payload }: { payload: RequestPayload }) {
  try {
    const data = htmlInsert(payload.code);
    yield put(htmlActions.insertSuccess({ data }));
  } catch (error: any) {
    yield put(htmlActions.insertFail({ error }));
  }
}

function* watchInsert() {
  yield takeLatest(htmlActions.insertRequest, insert);
}

export default function* html() {
  yield all([fork(watchInsert)]);
}
