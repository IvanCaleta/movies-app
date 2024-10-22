import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favoriteMovies: [],
};

export const bookmarkSlice = createSlice({
    name: 'bookmark',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            state.favoriteMovies.push(action.payload);
        },
        removeFromFavorites: (state, action) => {
            state.favoriteMovies = state.favoriteMovies.filter(item => item.id.toString() !== action.payload)
        },
    }
});

export const { addToFavorites, removeFromFavorites } = bookmarkSlice.actions;

export const getAllFavorites = (state) => {
    return state.bookmark.favoriteMovies;
}

export const checkFavorites = (movieId) => (state) => {
    return state.bookmark.favoriteMovies.map(movie=>movie.id.toString()).includes(movieId);
}