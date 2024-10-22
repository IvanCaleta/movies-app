import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SingleMovieItem } from '../MovieList/MovieList';
import '../MovieList/MovieListStyle.css';
import './FavoritesViewStyle.css';
import { useSelector } from 'react-redux';
import { noSearch, searchValue } from '../../redux/searchSlice';

const FavoritesView = ({ allFavorites }) => {
  const [selectedFavoriteMovie, setSelectedFavoriteMovie] = useState(allFavorites[0]?.id || null)
  const [movieIndex, setMovieIndex] = useState(0);
  const currentSearchValue = useSelector(searchValue);
  const noCurrentSearch = useSelector(noSearch);
  const movieRefs = useRef([]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'ArrowRight' || event.key === 'd') {
      event.preventDefault();
      const nextIndex = (movieIndex + 1) % allFavorites.length;
      setMovieIndex(nextIndex);
      setSelectedFavoriteMovie(allFavorites[nextIndex].id);
    } else if (event.key === 'ArrowLeft' || event.key === 'a') {
      event.preventDefault();
      const prevIndex = (movieIndex - 1 + allFavorites.length) % allFavorites.length;
      setMovieIndex(prevIndex);
      setSelectedFavoriteMovie(allFavorites[prevIndex].id);
    }
  }, [movieIndex, allFavorites, setSelectedFavoriteMovie,]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [movieIndex, allFavorites, handleKeyDown]);

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

  return (
    <div className='favorites-container'>
      {allFavorites.length ? allFavorites.filter(item => noCurrentSearch ? true : item.title.toLowerCase().includes(currentSearchValue.toLowerCase())).length ? <div className='movie-list'>
        {allFavorites.filter(item => noCurrentSearch ? true : item.title.toLowerCase().includes(currentSearchValue.toLowerCase()))
          .map((movie,index) => (
            <SingleMovieItem
              key={movie.id}
              movie={movie}
              selected={selectedFavoriteMovie === movie.id}
              handleMovieClick={() => setSelectedFavoriteMovie(movie.id)}
              movieRef={(el) => (movieRefs.current[index] = el)}
            />
          ))}
      </div> :
        <div className='no-selected'>
          No movies found
        </div> :
        <div className='no-selected'>
          No favorites selected
        </div>
      }
    </div>
  )
}

export default FavoritesView