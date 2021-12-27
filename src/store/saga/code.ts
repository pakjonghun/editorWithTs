import { RequestPayload, SuccessPayload } from "./../types";
import { fork, all, put, call, delay, takeLatest } from "redux-saga/effects";
import { codeActions } from "../reducer/code";

function requestInsert(data: string): SuccessPayload {
  return { data: { id: 1, data } };
}

function* insert({ payload }: { payload: RequestPayload }) {
  try {
    yield delay(1000);
    const data: SuccessPayload = yield call(requestInsert, payload.code);
    yield put(codeActions.insertSuccess(data));
  } catch (error: any) {
    yield put(codeActions.insertFail({ error }));
  }
}

function* watchInsert() {
  yield takeLatest(codeActions.insertRequest, insert);
}

export default function* code() {
  yield all([fork(watchInsert)]);
}
