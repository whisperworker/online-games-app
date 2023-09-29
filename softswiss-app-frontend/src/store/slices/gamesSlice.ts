import { IGameInfo } from "../../models/IGames";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchGames } from "./ActionCreators";

interface GamesState {
  games: Array<IGameInfo>;
  filteredGames: Array<IGameInfo> | null;
  isLoading: boolean;
  error: string;
}

const initialState: GamesState = {
  games: [],
  filteredGames: null,
  isLoading: false,
  error: "",
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setFilteredGames: (
      state: GamesState,
      action: PayloadAction<Array<IGameInfo>>,
    ) => {
      state.filteredGames = action.payload;
    },
  },
  extraReducers: {
    [fetchGames.fulfilled.type]: (
      state: GamesState,
      action: PayloadAction<Array<IGameInfo>>,
    ) => {
      state.isLoading = false;
      state.filteredGames = null;
      state.games = action.payload;
      state.error = "";
    },
    [fetchGames.pending]: (state: GamesState) => {
      state.isLoading = true;
    },
    [fetchGames.rejected]: (state: GamesState, action: Array<string>) => {
      state.isLoading = false;
      state.filteredGames = null;
      state.error = action.payload;
    },
  },
});

export const { setFilteredGames } = gamesSlice.actions;
