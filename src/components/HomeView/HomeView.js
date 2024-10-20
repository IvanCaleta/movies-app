import React, { useState } from 'react'
import { GenreRails } from '../../components'
import './HomeViewStyle.css'

const HomeView = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  return (
    <div className="homeView">
      <div className="homeTitle">
        Movies
      </div>
      <hr/>
      <GenreRails selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
    </div>
  )
}

export default HomeView