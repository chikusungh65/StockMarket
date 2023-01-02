import React, { useEffect, useState } from 'react';
import { dateTime } from '../utils';
import StockBox from '../HomeScreen/StockBox';
import './WatchList.css';

const WatchListScreen = () => {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        // get the watchlist from local storage and set it to state
        const storedWatchlist = localStorage.getItem('watchlist');
        if (storedWatchlist) {
            setWatchlist(JSON.parse(storedWatchlist));
        }
    }, []);

    return (
        <>
            <div className="watchlist">
                <div className="watchlist-conatiner">
                    <h1>YOUR-WATCHLIST💲</h1>
                    <h2>AS OF :{dateTime}</h2>
                    {watchlist.map((stock) => (
                        <StockBox stock={stock} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default WatchListScreen;
