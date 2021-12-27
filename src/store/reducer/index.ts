import { combineReducers } from "redux";
import code from "./code";
const rootReducer = combineReducers({ code });
export type rootReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
