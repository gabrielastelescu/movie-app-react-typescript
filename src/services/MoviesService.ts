import { MovieModel, MovieCategory, MoviesModel } from "../models/reduxModel";
import { BASE_URL, POSTER_BASE_URL, API_KEY, DEFAULT_LANGUAGE, MOVIE_COUNT_PER_ROW, MOVIE_CATEGORY_TRENDING, URL_TRENDING_MOVIES } from "../constants";
import { chunk } from "../utils";

const getMovieCategories = async (): Promise<MovieCategory[]> => {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${DEFAULT_LANGUAGE}`);
    const data = await response.json();
    const categories: MovieCategory[] = data?.genres?.map((genre: any) => { return { id: genre.id, title: genre.name } });
    return categories || [];
}

let previousCategory = '';
const getMovies = async (category: string | number, prevPage: number): Promise<MoviesModel> => {
    const hasCategoryChanged = previousCategory != category;
    // If movie category has changed, start from page one
    const pageNumber = previousCategory != category ? 1 : ++prevPage;
    // Previous category will now be current category
    previousCategory = category.toString();

    const url = category === MOVIE_CATEGORY_TRENDING ? URL_TRENDING_MOVIES : `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${DEFAULT_LANGUAGE}`
        + `&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`
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

    const chunkedMovies = chunk(movies, MOVIE_COUNT_PER_ROW);

    const moviesByCategory: MoviesModel = {
        categoryChanged: hasCategoryChanged,
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
