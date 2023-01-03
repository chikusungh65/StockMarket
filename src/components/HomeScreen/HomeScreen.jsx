import React, { useState } from 'react';
import './HomeScreen.css';
import Brand from './Brand';
import StockBox from './StockBox';

const HomeScreen = () => {
    const [search, setSearch] = useState('');
    const [stockData, setStockData] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    // debounce function to delay the API call until the user has stopped typing for 500ms
    const debounce = () => {
        let timeoutId;
        const callAPI = () => {
            // make request to the API for each company in the search query
            search.split(',').forEach(getStockInfo);
        };
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(callAPI, 500);
    };

    const getStockInfo = async (company) => {
        try {
            // make request to the API for the given company
            const res = await fetch(
                `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${company}&apikey=M1T4CVF8W9P5TDBZ`
            );
            const data = await res.json();
            // extract the symbol and name of the company from the API response
            const symbol = data['bestMatches'][0]['1. symbol'];
            const name = data['bestMatches'][0]['2. name'];
            // make another request to the API to get the latest share price of the company
            const res2 = await fetch(
                `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=M1T4CVF8W9P5TDBZ`
            );
            const data2 = await res2.json();
            // extract the latest share price from the API response
            const latestPrice = data2['Time Series (Daily)'][data2['Meta Data']['3. Last Refreshed']]['4. close'];
            // update the search results with the symbol, name, and latest share price
            setSearchResults((prevState) => [...prevState, { symbol, name, latestPrice: Number(latestPrice) },]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        // clear the stock data and search results when the search query is changed
        setStockData(null);
        setSearchResults([]);
        // make request to the API for each company in the search query
        debounce();
    };

    const handleResultClick = (result) => {
        // get the current watchlist from local storage
        let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        // add the selected stock to the watchlist
        watchlist = [...watchlist, result];
        // update the watchlist in local storage
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }


    return (
        <div className="content">
            <Brand />
            <div className="search-container">
                <input type="text" placeholder="Search for a company (e.g. Apple, Microsoft)" value={search} onChange={handleSearchChange} />
                {
                    searchResults.length > 0 &&
                    <div >

                        {searchResults.map(result => (
                            <div className='search-results'>
                                <div className='search' key={result.symbol} onClick={() => handleResultClick(result)}>
                                    <span className='symbol'>{result.symbol}</span>
                                    <span className='name'>{result.name}</span>
                                    <span className='price'>${result.latestPrice}</span>
                                    <i className='fa fa-plus'></i>
                                </div>
                            </div>

                        ))}
                    </div>
                }
            </div>
            {stockData && <StockBox stockData={stockData} />}
        </div>
    );
}
export default HomeScreen;