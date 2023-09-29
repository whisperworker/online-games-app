import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  currencyFilter: string;
  providerFilter: string;
}

const initialState: FilterState = {
  currencyFilter: "Валюта",
  providerFilter: "Провайдер",
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state: FilterState, action: PayloadAction<FilterState>) => {
      state = action.payload;
    },
  },
});

export const { setFilters } = filterSlice.actions;
