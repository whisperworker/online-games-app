import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { gamesSlice } from "./slices/gamesSlice";
import { filterSlice } from "./slices/filterSlice";

const rootReducer = combineReducers({
  gamesReducer: gamesSlice.reducer,
  filterReducer: filterSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = typeof store.dispatch;
