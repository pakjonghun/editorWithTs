import { combineReducers } from "redux";
import html from "./html";
import code from "./code";
const rootReducer = combineReducers({ code, html });
export type rootReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
