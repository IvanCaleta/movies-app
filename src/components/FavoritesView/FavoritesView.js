import React, { useState } from 'react'
import { SingleMovieItem } from '../MovieList/MovieList';
import '../MovieList/MovieListStyle.css';
import './FavoritesViewStyle.css';
import { useSelector } from 'react-redux';
import { noSearch, searchValue } from '../../redux/searchSlice';

const FavoritesView = ({ allFavorites }) => {
  const [selectedFavoriteMovie, setSelectedFavoriteMovie] = useState(allFavorites[0]?.id || null)
  const currentSearchValue = useSelector(searchValue);
  const noCurrentSearch = useSelector(noSearch);

  return (
    <div className='favorites-container'>
      {allFavorites.length ? allFavorites.filter(item => noCurrentSearch ? true : item.title.toLowerCase().includes(currentSearchValue.toLowerCase())).length ? <div className='movie-list'>
        {allFavorites.filter(item => noCurrentSearch ? true : item.title.toLowerCase().includes(currentSearchValue.toLowerCase()))
          .map(movie => (
            <SingleMovieItem
              key={movie.id}
              movie={movie}
              selected={selectedFavoriteMovie === movie.id}
              handleMovieClick={() => setSelectedFavoriteMovie(movie.id)}
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