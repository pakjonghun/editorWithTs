import { RequestPayload, SuccessPayload } from "./../types";
import { fork, all, put, call, takeLatest } from "redux-saga/effects";
import { codeActions, codeType } from "../reducer/code";

function requestInsert(data: string): SuccessPayload<codeType> {
  return { data: { id: 1, data } };
}

function* insert({ payload }: { payload: RequestPayload }) {
  try {
    const data: SuccessPayload<codeType> = yield call(
      requestInsert,
      payload.code
    );
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
