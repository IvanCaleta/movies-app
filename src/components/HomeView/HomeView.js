import React, { useState } from 'react'
import { GenreRails } from '../../components'
import './HomeViewStyle.css'

const HomeView = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
      <GenreRails
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie} />
  )
}

export default HomeView