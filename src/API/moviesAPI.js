import instance from "./instance";

export const getAllGenres = () => {
    return instance.get('/genre/movie/list');
}

export const getAllMoviesByGenre = (genreId) => {
    return instance.get(`/discover/movie?with_genres=${genreId}`)
}

export const getMovieDetails = (movieId) => {
    return instance.get('/movie/' + movieId)
}