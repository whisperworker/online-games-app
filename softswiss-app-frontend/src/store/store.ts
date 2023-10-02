import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { gamesSlice } from "./slices/gamesSlice";

const rootReducer = combineReducers({
  gamesReducer: gamesSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
