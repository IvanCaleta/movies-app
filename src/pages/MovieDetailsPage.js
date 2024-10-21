import React from 'react'
import { MovieDetailsView } from '../components'
import { useParams } from 'react-router-dom'

const MovieDetailsPage = () => {
  const movieId = useParams().movieId;
  return <MovieDetailsView movieId={movieId} />
}

export default MovieDetailsPage