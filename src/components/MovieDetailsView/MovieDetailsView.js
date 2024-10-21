import React, { useEffect, useState } from 'react';
import { getMovieDetails } from '../../API';
import './MovieDetailsViewStyle.css';

const MovieDetailsView = ({ movieId }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    getMovieDetails(movieId)
      .then((response) => {
        if (response.data) {
          setMovieDetails(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
        setMovieDetails(null);
      });
  }, [movieId]);

  return (
    <div className="details-container">
      {movieDetails && (
        <div className="details-section">
          <img
            src={process.env.REACT_APP_IMAGE_PATH + movieDetails.poster_path}
            alt={movieDetails.title}
            style={{ padding: '1em' }}
          />
          <div className="textInfo">
            <div className="movie-title">
              {movieDetails.title} ({movieDetails.release_date.split('-')[0]})
            </div>
            <hr />
            <div className="overview">{movieDetails.overview}</div>
            <div className="rate">
              <span className="star-icon">★</span>
              {movieDetails.vote_average.toFixed(2)} / 10 (
              {movieDetails.vote_count} votes)
            </div>
            <div className="extra-info">
              {`Duration: ${movieDetails.runtime} min`}
            </div>
            <div className="extra-info">
              {`Total revenue: ${movieDetails.revenue.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}`}
            </div>
            <div className="extra-info">
              {`Languages: ${movieDetails.spoken_languages.map(lang => ` ${lang.name}`).join(',')}`}
            </div>
            <div className="button-container">
              <button className="watch-button">
                <span className="icon">▶</span> Watch
              </button>
              <button className="bookmark-button">
                <span className="icon">🔖</span> Bookmark
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsView;