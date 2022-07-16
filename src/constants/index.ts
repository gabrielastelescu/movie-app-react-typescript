export const BASE_URL = process.env.REACT_APP_PUBLIC_BASE_URL;
export const POSTER_BASE_URL = process.env.REACT_APP_PUBLIC_POSTER_URL;
export const API_KEY = process.env.REACT_APP_PRIVATE_API_KEY;
export const DEFAULT_LANGUAGE = 'en-US';
export const MOVIE_COUNT_PER_ROW = 4;
export const MOVIE_CATEGORY_TRENDING = 'trending';
export const URL_TRENDING_MOVIES = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;