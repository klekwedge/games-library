/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useFetch from '../hooks/useFetch';
import { ICurrentGame, IGame, Loading } from '../types';

export type GamesState = {
  games: IGame[]
  gamesLoadingStatus: Loading
  currentGame: ICurrentGame | null;
  currentGameLoadingStatus: Loading;
  genre: string | null;
  platform: string | null;
  sort: string | null;
  page: number;
  attemptsGetGames: number;
  attemptsGetGame: number;
};

const initialState: GamesState = {
  games: [],
  gamesLoadingStatus: 'loading',
  currentGame: null,
  currentGameLoadingStatus: 'loading',
  genre: null,
  platform: null,
  sort: null,
  page: 1,
  attemptsGetGames: 0,
  attemptsGetGame: 0,
};

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchGames = createAsyncThunk('games/fetchGames', ({ genre, platform, sort }: { genre: string | null, platform: string | null, sort: string | null }) => {
  const { request } = useFetch();

  // ! Закомментированная ссылка ниже это бэкенд для хостинга статики и API для инкапсуляции внешних запросов на Node.JS.
  // ! Закомментировал данную ссылку, поскольку сервис Render может приостанавливать работу неактивных проектов, поэтому
  // ! для избежания ситуации при которой игры не будут получены, я закомментировал ссылку.
  // ! При необходимости ее можно раскомментировать и затестить бэкенд сервис, который написал.
  // let basicUrl = 'https://klekwedge-games-library-backend.onrender.com/games'

  // ! Закомментировать ссылку ниже в случае тестирования бэкенда:
  let basicUrl = `https://free-to-play-games-database.p.rapidapi.com/api/games?rapidapi-key=${API_KEY}`;

  basicUrl += genre ? `&category=${genre}` : ''
  basicUrl += platform ? `&platform=${platform}` : ''
  basicUrl += sort ? `&sort-by=${sort}` : ''


  return request(basicUrl);
});

export const fetchGame = createAsyncThunk('games/fetchGame', (id: number) => {
  // ! Закомментированная ссылка ниже это бэкенд для хостинга статики и API для инкапсуляции внешних запросов на Node.JS.
  // ! Закомментировал данную ссылку, поскольку сервис Render может приостанавливать работу неактивных проектов, поэтому
  // ! для избежания ситуации при которой игры не будут получены, я закомментировал данную ссылку.
  // ! При необходимости ее можно раскомментировать и затестить бэкенд сервис, который написал.
  // const basicUrl = `https://klekwedge-games-library-backend.onrender.com/game?id=${id}`

  // ! Закомментировать ссылку ниже в случае тестирования бэкенда:
  const basicUrl = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}&rapidapi-key=${API_KEY}`;

  const { request } = useFetch();
  return request(basicUrl);
});

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setCurrentGame: (state, action) => {
      state.currentGame = action.payload
      state.currentGameLoadingStatus = 'idle';
    },
    resetCurrentGame: (state) => {
      state.currentGame = null;
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
    setPlatform: (state, action) => {
      state.platform = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    clearFilters: (state) => {
      state.genre = null
      state.platform = null
      state.sort = null
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    incAttemptsGetGames: (state) => {
      state.attemptsGetGames += 1;
    },
    incAttemptsGetGame: (state) => {
      state.attemptsGetGame += 1;
    },
    resetAttemptsGetGame: (state) => {
      state.attemptsGetGame = 0;
    },
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
export const { setCurrentGame, resetCurrentGame, setGenre, setPlatform, setSort, clearFilters, setPage, incAttemptsGetGames, incAttemptsGetGame, resetAttemptsGetGame } = actions;
export default reducer;