import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchMoviesByCategory } from '../../store/movieActions';
import { MovieModel } from "../../models/reduxModel";

import './Movies.css';

function Movies() {
    const dispatch = useAppDispatch();
    const params = useParams();
    const chunkedMovies = useAppSelector(state => state.movieSlice.moviesByCategory.movies);
    const prevPage = useAppSelector(state => state.movieSlice.moviesByCategory.currentPage);
    const [style, setStyle] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const ref = useRef<any>(null);

    const onScroll = (e: any) => {
        const isAtBottom = e.target.scrollHeight - e.target.scrollTop < e.target.clientHeight + 5;

        if (isAtBottom && !isLoading) {
            getMovies();
        }
    };

    const getMovies = async () => {
        if (!isLoading) {
            setIsLoading(true);
            dispatch(fetchMoviesByCategory(params.categoryId!, prevPage))
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setStyle({ height: ref.current.parentElement.offsetHeight });
        getMovies();
    }, [params.categoryId]);

    const MovieRow = ({ movies }: any) => {
        return (
            <div className='movie-row'>
                {movies.map((movie: MovieModel) => {
                    return (
                        <div className='movie' key={movie.id}>
                            <Link to={`/movies/${movie.id}`} key={movie.id}>
                                <img src={movie.poster} className="movie_image" />
                                <h3>{movie.title}</h3>
                            </Link>
                        </div>
                    )
                })
                }
            </div >
        );
    }
    return (
        <>
            {
                isLoading ?
                    <div>Loading...</div>
                    :
                    <div className='movies-root' ref={ref} onScroll={onScroll} style={style}>
                        {chunkedMovies.map((movieRow: any, index: number) => {
                            return (
                                <MovieRow key={index} movies={movieRow} />
                            )
                        })}
                    </div>
            }
        </>
    );
}

export default Movies