import React, { useEffect, useState } from 'react'
import { getAllMoviesByGenre } from '../../API';
import './MovieListStyle.css';

const SingleMovieItem = ({ title }) => {
    return (
        <div className="movie-item">
            {title}
        </div>
    )
}

const MovieList = ({ genreId }) => {
    const [moviesArray, setMoviesArray] = useState([]);

    useEffect(() => {
        if (genreId) {
            getAllMoviesByGenre(genreId).then(response => {
                if (response.data) {
                    setMoviesArray(response.data.results)
                }
            })
        }
    }, [genreId])

    return (
        <div className="movie-list">
            {moviesArray.map((movie, index) => (
                <SingleMovieItem key={index} title={movie.title} />
            ))}
        </div>
    )
}

export default MovieList