import React from 'react';
import './StockPrice.css';
import numeral from "numeral";

const StockPrice = () => {
    return (
        <div className="price-container" >
            <div className="stockPrice_info">
                <div className="stock_price">Open</div>
                <div className="stocksPrice">{numeral(15050.111).format("0,0.[00]")}</div>
            </div>
            <div className="stockPrice_info">
                <div className="stock_price">High</div>
                <div className="stocksPrice">{numeral(15050.111).format("0,0.[00]")}</div>
            </div>
            <div className="stockPrice_info">
                <div className="stock_price">Low</div>
                <div className="stocksPrice">{numeral(15050.111).format("0,0.[00]")}</div>
            </div>
            <div className="stockPrice_info">
                <div className="stock_price">Close</div>
                <div className="stocksPrice">{numeral(15050.111).format("0,0.[00]")}</div>
            </div>
            <div className="stockPrice_info">
                <div className="stock_price">Volume</div>
                <div className="stocksPrice">{numeral(15050.111).format("0,0.[00]")}</div>
            </div>
            <i class="fa fa-trash-o" aria-hidden="true"></i>
        </div>
    )
}

export default StockPrice
