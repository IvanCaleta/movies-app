import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import './NavigationBarStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetSearch, searchValue, setSearch } from '../../redux/searchSlice';

const NavigationBar = ({ hideSearch, currentPage }) => {
    const navigate = useNavigate();
    const [showSearchInput, setShowSearchInput] = useState(false);
    const currentSearchValue = useSelector(searchValue);
    const dispatch = useDispatch();

    const modifySearchValue = (newText) => {
        dispatch(setSearch(newText));
    }

    const clearSearch = () => {
        dispatch(resetSearch());
        setShowSearchInput(false);
    }

    useEffect(() => {
        dispatch(resetSearch());
        setShowSearchInput(false);
    }, [currentPage, dispatch]);

    return (
        <div className='navbar-container'>
            <nav className='navbar'>
                <ul>
                    <li>
                        <button
                            onClick={() => navigate('/home')}
                            className={currentPage.pathname === '/home' ? 'active' : ''}>
                            Home
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => navigate('/favorites')}
                            className={currentPage.pathname === '/favorites' ? 'active' : ''}>
                            Favorites
                        </button>
                    </li>
                    {!hideSearch && <li>
                        <button onClick={() => setShowSearchInput(true)}>
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="icon"
                            />
                            Search
                        </button>
                    </li>}
                </ul>
            </nav>
            {showSearchInput && < div
                className='search-input-container' >
                <input
                    type='text'
                    placeholder='Type movie name'
                    className='search-input'
                    value={currentSearchValue}
                    onChange={(e) => modifySearchValue(e.target.value)}
                />
                <button className='clear-search-button' onClick={clearSearch}>
                    <FontAwesomeIcon icon={faTimes} className="clear-icon" />
                </button>
            </div>}
        </div >
    )
}

export default NavigationBar