import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getAllGenres } from '../../API';
import './GenreRailsStyle.css';
import { MovieList } from '../../components';

const SingleGenreRail = ({ id, name, handleClickOnGenre, selected, index, genreRef }) => {
    return (
        <div className="genre-item">
            <button
                className={`genre ${selected ? 'selected' : ''}`}
                onClick={() => handleClickOnGenre(id, index)}
                ref={genreRef}
            >
                {name}
            </button>
        </div>
    );
};

const GenreRails = ({ selectedGenre, setSelectedGenre, selectedMovie, setSelectedMovie }) => {
    const [allGenres, setAllGenres] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isManualMovieSelection, setIsManualMovieSelection] = useState(false);
    const genreRefs = useRef([]);

    const handleClickOnGenre = (genreId, index) => {
        setSelectedIndex(index);
        setSelectedGenre(genreId);
        setIsManualMovieSelection(false);
    };

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'ArrowDown' || event.key === 's') {
            event.preventDefault();
            const nextIndex = (selectedIndex + 1) % allGenres.length;
            setSelectedIndex(nextIndex);
            setSelectedGenre(allGenres[nextIndex].id);
            setIsManualMovieSelection(false);
        } else if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'Backspace') {
            event.preventDefault();
            const prevIndex = (selectedIndex - 1 + allGenres.length) % allGenres.length;
            setSelectedIndex(prevIndex);
            setSelectedGenre(allGenres[prevIndex].id);
            setIsManualMovieSelection(false);
        }
    }, [allGenres, selectedIndex, setSelectedGenre]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedIndex, allGenres, handleKeyDown]);

    useEffect(() => {
        getAllGenres().then((response) => {
            if (response.data) {
                setAllGenres(response.data.genres);
                setSelectedGenre(response.data.genres[0].id);
            }
        });
    }, [setSelectedGenre]);

    useEffect(() => {
        if (genreRefs.current[selectedIndex]) {
            const currentElement = genreRefs.current[selectedIndex];

            currentElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }

    }, [selectedIndex]);

    useEffect(() => {
        genreRefs.current = genreRefs.current.slice(0, allGenres.length);
    }, [allGenres]);

    return (
        <div className="genre-rails">
            {allGenres.map((genre, index) => (
                <div key={index} className="genre-section">
                    <SingleGenreRail
                        name={genre.name}
                        id={genre.id}
                        handleClickOnGenre={handleClickOnGenre}
                        selected={genre.id === selectedGenre}
                        index={index}
                        genreRef={(el) => (genreRefs.current[index] = el)}
                    />
                    <MovieList
                        genreId={genre.id}
                        isGenreSelected={genre.id === selectedGenre}
                        setSelectedGenre={setSelectedGenre}
                        selectedMovie={selectedMovie}
                        setSelectedMovie={setSelectedMovie}
                        isManualSelection={isManualMovieSelection}
                        setIsManualSelection={setIsManualMovieSelection}
                        changeGenreIndex={() => setSelectedIndex(index)}
                    />
                </div>
            ))}
        </div>
    );
};

export default GenreRails;