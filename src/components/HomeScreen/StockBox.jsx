import React from 'react';
import './StockBox.css';
import numeral from 'numeral';

const StockBox = ({ stock, addToWatchList }) => {

    const { symbol, name, latestPrice } = stock;

    const deleteFromWatchlist = () => {
        // get the current watchlist from local storage
        const storedWatchlist = localStorage.getItem('watchlist');
        if (storedWatchlist) {
            // parse the stored watchlist to an array
            const watchlist = JSON.parse(storedWatchlist);
            // delete the stock from the watchlist
            const updatedWatchlist = watchlist.filter((s) => s.symbol !== stock.symbol);
            // store the updated watchlist in local storage
            localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
        }
    };

    // check if the stock is in the watchlist
    const storedWatchlist = localStorage.getItem('watchlist');
    let isInWatchlist = false;
    if (storedWatchlist) {
        const watchlist = JSON.parse(storedWatchlist);
        isInWatchlist = watchlist.some((s) => s.symbol === stock.symbol);
    }



    return (
        <div className="price-container">
            <div className="stock_name">
                {name}
            </div>
            <div className="stockPrice_info">
                <div className="stock_price">Symbol</div>
                <div className="stocksPrice">
                    {symbol}
                </div>
            </div>
            <div className="stockPrice_info">
                <div className="stock_price">Price</div>
                <div className="stocksPrice">
                    {numeral(latestPrice).format('0,0.[00]')}
                </div>
            </div>

            {isInWatchlist && <i className="fa fa-trash" onClick={deleteFromWatchlist}></i>}
        </div>
    );
}


export default StockBox;