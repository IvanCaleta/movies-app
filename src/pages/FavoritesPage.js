import React from 'react'
import { FavoritesView, NavigationBar } from '../components'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllFavorites } from '../redux/bookmarkSlice';

const FavoritesPage = () => {
    const currentPage = useLocation();
    const allFavorites = useSelector(getAllFavorites);

    return (
        <div>
            <NavigationBar currentPage={currentPage} hideSearch={!allFavorites.length} />
            <FavoritesView allFavorites={allFavorites} />
        </div>
    )
}

export default FavoritesPage