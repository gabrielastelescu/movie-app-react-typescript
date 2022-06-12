import { MovieModel, MovieCategory, MoviesModel } from "../models/reduxModel";

const BASE_URL = process.env.REACT_APP_PUBLIC_BASE_URL;
const POSTER_BASE_URL = process.env.REACT_APP_PUBLIC_POSTER_URL;
const API_KEY = process.env.REACT_APP_PRIVATE_API_KEY;
const DEFAULT_LANGUAGE = 'en-US';
const CHUNK_SIZE = 4;

const getMovieCategories = async (): Promise<MovieCategory[]> => {

    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${DEFAULT_LANGUAGE}`);
    const data = await response.json();
    const categories: MovieCategory[] = data?.genres?.map((genre: any) => { return { id: genre.id, title: genre.name } });
    return categories || [];
}

const chunk = (arr: MovieModel[], chunkSize: number) => {
    if (chunkSize <= 0) throw new Error("Invalid chunk size");
    var rows = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize)
        rows.push(arr.slice(i, i + chunkSize));
    return rows;
}

let previousCategory = '';
const getMovies = async (category: string | number, prevPage: number): Promise<MoviesModel> => {
    const isCategoryChanged = previousCategory != category;
    let page = prevPage;

    if (isCategoryChanged) {
        page = 1;
    } else {
        page++;
    }

    previousCategory = category.toString();

    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${DEFAULT_LANGUAGE}`
        + `&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
        + `&with_genres=${category}&with_watch_monetization_types=flatrate`

    const response = await fetch(url);
    const data = await response.json();

    const movies: MovieModel[] = data?.results?.map((movie: any) => {

        return {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            poster: `${POSTER_BASE_URL}/${movie.poster_path}`
        }
    });

    const chunkedMovies = chunk(movies, CHUNK_SIZE);

    const moviesByCategory: MoviesModel = {
        categoryChanged: isCategoryChanged,
        currentPage: data?.page,
        totalNrOfPages: data?.total_pages,
        movies: chunkedMovies
    }

    return moviesByCategory;
}

export const MoviesService = {
    getMovieCategories,
    getMovies
}