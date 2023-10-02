import { IGameInfo } from "../../models/IGames";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchGames } from "./ActionCreators";

interface GamesState {
  games: Array<IGameInfo>;
  isLoading: boolean;
  error: string;
}

const initialState: GamesState = {
  games: [],
  isLoading: false,
  error: "",
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: Object.create({}),
  extraReducers: {
    [fetchGames.fulfilled.type]: (
      state: GamesState,
      action: PayloadAction<Array<IGameInfo>>,
    ) => {
      state.isLoading = false;
      state.games = action.payload;
      state.error = "";
    },
    [fetchGames.pending]: (state: GamesState) => {
      state.isLoading = true;
    },
    [fetchGames.rejected]: (state: GamesState, action: Array<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
