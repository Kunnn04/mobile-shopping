import { configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import { epicDependencies, rootEpic } from "./root.epic";
import { rootReducer } from "./root.reducer";
import { Action } from "@reduxjs/toolkit";
import { RootState as ReducerState } from "./root.reducer";

const epicMiddleware = createEpicMiddleware<
  Action,
  Action,
  ReducerState,
  typeof epicDependencies
>({ dependencies: epicDependencies });

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
