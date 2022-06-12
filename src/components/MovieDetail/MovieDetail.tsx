import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchMovieById } from '../../store/movieActions';
import './MovieDetail.css';

export default function MovieDetail() {

    const { movieId } = useParams();
    const movie = useAppSelector(state => state.movieSlice.movieDetail);
    let navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchMovieById(movieId!));
    }, []);

    return (
        movie && movie.title ?
            <div className='move-detail-container'>
                <div className='movie-details-root'>
                    <img alt="" className='movie-image' src={movie.poster} />

                    <h3>{movie.title}</h3>
                    <p>{movie.overview}</p>
                </div>
                <div className='back-button'>
                    <button onClick={() => { navigate(-1) }} className='back-button'>Back</button>
                </div>
            </div>
            : <div>Loading...</div>

    )
}
