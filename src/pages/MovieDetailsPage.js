import React from 'react'
import { MovieDetailsView, NavigationBar } from '../components'
import { useLocation, useParams } from 'react-router-dom'

const MovieDetailsPage = () => {
  const movieId = useParams().movieId;
  const currentPage = useLocation();

  return (
    <div>
      <NavigationBar currentPage={currentPage} hideSearch />
      <MovieDetailsView movieId={movieId} />
    </div>
  )

}

export default MovieDetailsPage