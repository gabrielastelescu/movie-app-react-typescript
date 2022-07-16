import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { MovieCategory } from '../../models/reduxModel';
import { fetchAllCategories, movieActions } from '../../store/movieActions';

import './MovieCategories.css';

function MovieCategories() {

    let [selectedCategory, setSelectedCategory] = useState(0);

    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.movieSlice.categories);

    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [])

    const onCategoryChangeHandler = (category: MovieCategory) => {
        setSelectedCategory(category.id);
        dispatch(movieActions.setCategory(category));
    }

    return (
        <div className='root'>
            {categories.map(category => {
                return (
                    <div onClick={() => onCategoryChangeHandler(category)} className={`movie-category ${selectedCategory === category.id ? "selected" : ''}`} key={category.id}>
                        <h4>
                            <Link to={`categories/${category.id}`} replace={true} key={category.id}>{category.title}
                            </Link>
                        </h4>
                    </div>
                )
            })}
        </div>
    )
}

export default MovieCategories