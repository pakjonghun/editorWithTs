import {
  ActionStatus,
  FailPayload,
  RequestPayload,
  SuccessPayload,
} from "./../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type codeType = {
  id: number;
  data: string;
};

type codeState = {
  insertStatus: ActionStatus;
  data: codeType;
  error: string | null;
};

const initialState: codeState = {
  insertStatus: "loading",
  data: { id: 1, data: "" },
  error: null,
};

const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    insertRequest: (state, _: PayloadAction<RequestPayload>) => {
      state.insertStatus = "loading";
    },
    insertSuccess: (
      state,
      { payload }: PayloadAction<SuccessPayload<codeType>>
    ) => {
      state.insertStatus = "success";
      state.data = payload.data;
    },
    insertFail: (state, { payload }: PayloadAction<FailPayload>) => {
      state = initialState;
      state.insertStatus = "fail";
      state.error = payload.error;
    },
  },
});

export const codeActions = codeSlice.actions;
export default codeSlice.reducer;
