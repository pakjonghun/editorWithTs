import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";

const sagaMiddleWare = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleWare],
});

sagaMiddleWare.run(rootSaga);

export default store;
