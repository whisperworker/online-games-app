import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGames = createAsyncThunk(
  "fetchGames",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(
        "http://localhost:3001/api/games",
      );
      return await res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue("Не удалось загрузить игры");
    }
  },
);
