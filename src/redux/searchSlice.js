import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    search: "",
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        resetSearch: (state) => {
            state.search = "";
        },
    }
})

export const { setSearch, resetSearch } = searchSlice.actions;

export const noSearch = (state) => {
    return state.search?.search?.trim === "";
}

export const searchValue = (state) => {
    return state.search?.search || "";
}

