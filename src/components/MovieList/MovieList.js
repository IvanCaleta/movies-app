import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getAllMoviesByGenre } from '../../API';
import './MovieListStyle.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { noSearch, searchValue } from '../../redux/searchSlice';

export const SingleMovieItem = ({ movie, genreId, selected, handleMovieClick, index, movieRef }) => {
    const navigate = useNavigate();

    const additionalContent = <div className='extra-info'>
        <div>
            ({movie.release_date.split('-')[0]})
        </div>
        <div className='rate'>
            {movie.vote_average.toFixed(1)} / 10
        </div>
        <div className='details-button'>
            <button onClick={() => navigate('/details/' + movie.id)}>
                Details
            </button>
        </div>
    </div>

    return (
        <div
            className={`movie-item ${selected ? 'selected' : ''}`}
            onClick={() => handleMovieClick(movie.id, genreId, index)}
            ref={movieRef}
        >
            <img src={process.env.REACT_APP_IMAGE_PATH + movie.poster_path}
                alt={movie.title}
                style={{ maxWidth: '100%', maxHeight: '400px' }} />
            <div className='movie-title'>
                {movie.title}
            </div>
            {selected && additionalContent}
        </div>
    )
}

const MovieList = ({ genreId, isGenreSelected, setSelectedGenre, selectedMovie, setSelectedMovie, isManualSelection, setIsManualSelection, changeGenreIndex }) => {
    const [moviesArray, setMoviesArray] = useState([]);
    const [movieIndex, setMovieIndex] = useState(0);
    const movieRefs = useRef([]);
    const currentSearchValue = useSelector(searchValue);
    const noCurrentSearch = useSelector(noSearch);

    const handleMovieClick = (movieId, genreId, index) => {
        if (isGenreSelected) {
            setSelectedMovie(movieId);
        }
        else {
            setSelectedMovie(movieId);
            setSelectedGenre(genreId);
            changeGenreIndex();
        }
        setIsManualSelection(true);
        setMovieIndex(index)
    }

    const handleKeyDown = useCallback((event) => {
        if (isGenreSelected && (event.key === 'ArrowRight' || event.key === 'd')) {
            event.preventDefault();
            const nextIndex = (movieIndex + 1) % moviesArray.length;
            setMovieIndex(nextIndex);
            setSelectedMovie(moviesArray[nextIndex].id);
        } else if (isGenreSelected && (event.key === 'ArrowLeft' || event.key === 'a')) {
            event.preventDefault();
            const prevIndex = (movieIndex - 1 + moviesArray.length) % moviesArray.length;
            setMovieIndex(prevIndex);
            setSelectedMovie(moviesArray[prevIndex].id);
        }
    }, [movieIndex, moviesArray, setSelectedMovie, isGenreSelected]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [movieIndex, moviesArray, handleKeyDown]);

    useEffect(() => {
        if (movieRefs.current[movieIndex]) {
            const currentElement = movieRefs.current[movieIndex];
            currentElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            });
        }

    }, [movieIndex]);

    useEffect(() => {
        movieRefs.current = [];
    }, [genreId]);

    useEffect(() => {
        movieRefs.current = movieRefs.current.slice(0, moviesArray.length);
    }, [moviesArray]);

    useEffect(() => {
        if (genreId) {
            getAllMoviesByGenre(genreId).then(response => {
                if (response.data) {
                    setMoviesArray(response.data.results);
                    if (isGenreSelected && !isManualSelection) {
                        setSelectedMovie(response.data.results[0].id);
                        setMovieIndex(0);
                    }
                }
            }).catch(error=>{
                setMoviesArray([]);
                console.error(error);
            })
        }
    }, [genreId, isGenreSelected, setSelectedMovie, isManualSelection])

    return (
        <div>
            {moviesArray.filter(item => noCurrentSearch ? true : item.title.toLowerCase().includes(currentSearchValue.toLowerCase())).length ?
                <div className="movie-list">
                    {moviesArray.filter(item => noCurrentSearch ? true : item.title.toLowerCase().includes(currentSearchValue.toLowerCase()))
                        .map((movie, index) => (
                            <SingleMovieItem
                                key={`${movie.id}-${genreId}`}
                                genreId={genreId}
                                selected={movie.id === selectedMovie && isGenreSelected}
                                movie={movie}
                                handleMovieClick={handleMovieClick}
                                index={index}
                                movieRef={(el) => (movieRefs.current[index] = el)}
                            />
                        ))}
                </div> :
                <div className='no-found-container'>
                    <div className='no-found'>No movies found</div>
                </div>
            }
        </div>
    )
}

export default MovieList