/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useFetch from '../hooks/useFetch';
import { IGame, Loading } from '../types';

export type GamesState = {
  games: IGame[]
  gamesLoadingStatus: Loading
};

const initialState: GamesState = {
  games: [],
  gamesLoadingStatus: 'loading'
};

export const fetchGames = createAsyncThunk('games/fetchGames', (url: string) => {
  const { request } = useFetch();
  return request(url);
});

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.gamesLoadingStatus = 'loading';
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.gamesLoadingStatus = 'idle';
        state.games = action.payload;
      })
      .addCase(fetchGames.rejected, (state) => {
        state.gamesLoadingStatus = 'error';
      })
  },
});


const { actions, reducer } = gamesSlice;
// export const {  } = actions;
export default reducer;