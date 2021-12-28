import { useState } from "react";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  ActionStatus,
  FailPayload,
  RequestPayload,
  SuccessPayload,
} from "./../types";
import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

export type HtmlType = {
  id: string;
  data: string;
};

type HtmlState = {
  data: HtmlType;
  htmlStatus: ActionStatus;
  error: null | string;
};

const initialState: HtmlState = {
  data: { id: "1", data: "" },
  htmlStatus: "loading",
  error: null,
};

const htmlSlice = createSlice({
  name: "html",
  initialState,
  reducers: {
    insertRequest: (state, { payload }: PayloadAction<RequestPayload>) => {
      state.htmlStatus = "loading";
    },
    insertSuccess: (
      state,
      { payload }: PayloadAction<SuccessPayload<HtmlType>>
    ) => {
      state.htmlStatus = "success";
      state.data = payload.data;
    },
    insertFail: (state, { payload }: PayloadAction<FailPayload>) => {
      state.htmlStatus = "fail";
      state.error = payload.error;
    },
  },
});

export const htmlActions = htmlSlice.actions;
export default htmlSlice.reducer;
