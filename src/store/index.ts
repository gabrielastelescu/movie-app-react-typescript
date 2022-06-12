import { configureStore } from '@reduxjs/toolkit';
import movieSlice from './movieSlice';

const store = configureStore({
  reducer: {
    movieSlice: movieSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
