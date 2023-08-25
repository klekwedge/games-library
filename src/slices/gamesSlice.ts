/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useFetch from '../hooks/useFetch';
import { ICurrentGame, IGame, Loading } from '../types';

export type GamesState = {
  games: IGame[]
  gamesLoadingStatus: Loading
  currentGame: ICurrentGame | null;
  currentGameLoadingStatus: Loading
};

const initialState: GamesState = {
  games: [],
  gamesLoadingStatus: 'loading',
  currentGame: null,
  currentGameLoadingStatus: 'loading'
};

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchGames = createAsyncThunk('games/fetchGames', () => {
  const { request } = useFetch();
  return request(`https://free-to-play-games-database.p.rapidapi.com/api/games?rapidapi-key=${API_KEY}`);
});

export const fetchGame = createAsyncThunk('games/fetchGame', (id: number) => {
  const { request } = useFetch();
  return request(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}&rapidapi-key=${API_KEY}`);
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
      .addCase(fetchGame.pending, (state) => {
        state.currentGameLoadingStatus = 'loading';
      })
      .addCase(fetchGame.fulfilled, (state, action) => {
        state.currentGameLoadingStatus = 'idle';
        state.currentGame = action.payload;
      })
      .addCase(fetchGame.rejected, (state) => {
        state.currentGameLoadingStatus = 'error';
      })
  },
});


const { actions, reducer } = gamesSlice;
// export const {  } = actions;
export default reducer;