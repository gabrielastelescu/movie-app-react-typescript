import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieModel, MovieArrayModel, MovieCategory, MoviesModel } from '../models/reduxModel';

const initialMovieState: MovieArrayModel = {

  category: {
    id: 0,
    title: '',
  },

  categories: [],

  moviesByCategory: {
    categoryChanged: false,
    currentPage: 0,
    movies: [],
    totalNrOfPages: -1, 
  },

  movieDetail: {
    id: '',
    title: '',
    overview: '',
    poster: ''
  },

}

const movieSlice = createSlice({

  name: 'movie',

  initialState: initialMovieState,
  
  reducers: {
    setCategories(state, action: PayloadAction<MovieCategory[]>) {
      state.categories = action.payload;
    },
    setCategory(state, action: PayloadAction<MovieCategory>) {
      state.category = action.payload;
    },
    setMoviesByCategory(state, action: PayloadAction<MoviesModel>) {
      console.log("category changed", action.payload.categoryChanged);
      state.moviesByCategory.movies = action.payload.categoryChanged ? [...action.payload.movies] : [...state.moviesByCategory.movies, ...action.payload.movies]
      state.moviesByCategory.currentPage = action.payload.currentPage;
      state.moviesByCategory.totalNrOfPages = action.payload.totalNrOfPages;
    },
    setMovieDetail(state, action: PayloadAction<MovieModel>) {
      state.movieDetail = action.payload
    },
  }
});

export default movieSlice;