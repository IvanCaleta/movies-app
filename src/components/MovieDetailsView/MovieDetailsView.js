import React, { useEffect, useRef, useState } from 'react';
import { getMovieDetails } from '../../API';
import './MovieDetailsViewStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, checkFavorites, removeFromFavorites } from '../../redux/bookmarkSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStar, faBookmark as SolidBookmark, faCancel } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as RegularBookmark } from '@fortawesome/free-regular-svg-icons';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

const MovieDetailsView = ({ movieId }) => {
  const [movieDetails, setMovieDetails] = useState({ loading: true });
  const isInFavorites = useSelector(checkFavorites(movieId));
  const [showVideo, setShowVideo] = useState(false);
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const handleAddOrRemoval = () => {
    if (!isInFavorites) {
      dispatch(addToFavorites(movieDetails));
    }
    else {
      dispatch(removeFromFavorites(movieId))
    }
  }

  useEffect(() => {
    setMovieDetails({ loading: true });
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

  useEffect(() => {
    if (showVideo && videoRef?.current) {
      videoRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [showVideo]);

  return (
    <div className="details-container">
      {movieDetails !== null && !movieDetails.loading ? (
        <>
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
                <FontAwesomeIcon
                  icon={faStar}
                  className="icon"
                />
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
                <button className="watch-button"
                  onClick={() => setShowVideo(!showVideo)}>
                  <FontAwesomeIcon
                    icon={showVideo ? faCancel : faPlay}
                    className="icon"
                  />
                  {showVideo ? "Hide Video" : "Watch"}
                </button>
                <button className="bookmark-button" onClick={() => handleAddOrRemoval()}>
                  <FontAwesomeIcon
                    icon={isInFavorites ? SolidBookmark : RegularBookmark}
                    className="icon"
                  />
                  {isInFavorites ? "Remove from favorites" : "Add to favorites"}
                </button>
              </div>
            </div>
          </div>
          {showVideo && (
            <div className="video-section"
              ref={videoRef}>
              <VideoPlayer movieId={movieId} />
            </div>
          )}
        </>
      ) : (
        <div className='details-not-found'>
          {movieDetails?.loading ? "Loading details..." : "Movie details not found"}
        </div>
      )}
    </div>

  );
};

export default MovieDetailsView;