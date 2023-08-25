import { configureStore } from '@reduxjs/toolkit';
import games from '../slices/gamesSlice';

const store = configureStore({
    reducer: {
        games,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;