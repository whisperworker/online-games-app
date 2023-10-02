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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchGames.fulfilled.type,
      (state: GamesState, action: PayloadAction<Array<IGameInfo>>) => {
        state.isLoading = false;
        state.games = action.payload;
        state.error = "";
      },
    );
    builder.addCase(fetchGames.pending.type, (state: GamesState) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchGames.rejected.type,
      (state: GamesState, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      },
    );
  },
});
