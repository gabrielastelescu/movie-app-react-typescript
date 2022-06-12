import movieSlice from './movieSlice'
import { AnyAction } from '@reduxjs/toolkit'
import { ThunkAction } from '@reduxjs/toolkit'
import { RootState } from './index'
import { MovieCategory, MovieModel, MoviesModel } from "../models/reduxModel";
import { MoviesService } from "../services/MoviesService";

export const movieActions = movieSlice.actions

export const fetchMoviesByCategory = (category: string | number , prevPage: number): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {

        const response: MoviesModel = await MoviesService.getMovies(category, prevPage);

        dispatch(movieActions.setMoviesByCategory(response))

    }
}

export const fetchMovieById = (movieId: string): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {

        const movieDetail = getState().movieSlice.moviesByCategory.movies.flat()
        .filter((movie: MovieModel) => movie.id == movieId)[0];

        dispatch(movieActions.setMovieDetail(movieDetail))

    }
}

export const fetchAllCategories = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {

        if (getState().movieSlice.categories.length === 0) {
            const response: MovieCategory[] = await MoviesService.getMovieCategories();
            dispatch(movieActions.setCategories(response))
        }
    }
}
