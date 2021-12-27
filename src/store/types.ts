import { codeType } from "./reducer/code";
export type RequestPayload = {
  code: string;
};

export type SuccessPayload = {
  data: codeType;
};

export type FailPayload = {
  error: string;
};

export type ActionStatus = "loading" | "fail" | "success";
