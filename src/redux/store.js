import { configureStore } from "@reduxjs/toolkit";
import { bookmarkSlice } from "./bookmarkSlice";
import { searchSlice } from "./searchSlice";


export const store = configureStore({
    reducer: {
        bookmark: bookmarkSlice.reducer,
        search: searchSlice.reducer,
    }
})