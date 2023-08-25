import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export type GamesState = {
  games: []
};

const initialState: GamesState = {
  games: []
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
  },
});


const { actions, reducer } = gamesSlice;
// export const {  } = actions;
export default reducer;