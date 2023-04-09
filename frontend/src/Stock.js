import Navbar from "./components/Navbar";
import Card from "./components/Card";
import NetChange from "./components/NetChange";
import NewsTiles from "./components/NewsTiles";
import "./styles/Stock.css";
import { useState } from "react";

function Stock() {
    const [amount, setAmount] = useState(0);
    const [buy, setBuy] = useState(false);
    const [sell, setSell] = useState(false);

    const toggleBuy = () => {
        if (!buy) {
            setBuy(true);
        } else {
            setBuy(false);
        }
    };

    const toggleSell = () => {
        if (!sell) {
            setSell(true);
        } else {
            setSell(false);
        }
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
        console.log(event.target.value);
    };

    return (
        <div>
            <Navbar />
            <div className="Stock">
                <Card width="800px">
                    {!buy && !sell && (
                        <div>
                            <div className="row center">
                                <h2 id="name">Stock 1</h2>
                                <h2>(STOCK1)</h2>
                            </div>
                            <div className="row space-out" id="range">
                                <NetChange change="6000" fontSize="20px" />
                                <div className="row">
                                    <div className="range-times range-selected"><div><p>1W</p></div></div>
                                    <div className="range-times"><p>1M</p></div>
                                    <div className="range-times"><p>6M</p></div>
                                    <div className="range-times"><p>1Y</p></div>
                                    <div className="range-times"><p>2Y</p></div>
                                    <div className="range-times"><p>3Y</p></div>
                                </div>
                            </div>
                            <div className="graph"></div>
                            <div>
                                <center><h3 id="news">Related News</h3></center>
                                <NewsTiles />
                            </div>
                            <div className="columns">
                                <div className="featured button" id="buy" onClick={toggleBuy}>
                                    <center><h3>Buy</h3></center>
                                </div>
                                <div className="featured button" id="sell" onClick={toggleSell}>
                                    <center><h3>Sell</h3></center>
                                </div>
                            </div>
                        </div>
                    )}
                    {buy && (
                        <div className="row center">
                            <div>
                                <div className="row" id="amount">
                                    <h3>$</h3>
                                    <input type="text" value={amount} onChange={handleAmountChange} />
                                </div>
                                <div className="button" id="buy">
                                    <center><h3>Buy</h3></center>
                                </div>
                                <div className="button cancel" onClick={toggleBuy}>
                                    <center><h3>Cancel</h3></center>
                                </div>
                            </div>
                        </div>
                    )}
                    {sell && (
                        <div className="row center">
                            <div>
                                <div className="row" id="amount">
                                    <input type="text" value={amount} onChange={handleAmountChange} />
                                    <p>shares</p>
                                </div>
                                <div className="button" id="sell">
                                    <center><h3>Sell</h3></center>
                                </div>
                                <div className="button cancel" onClick={toggleSell}>
                                    <center><h3>Cancel</h3></center>
                                </div>
                            </div>
                        </div>
                    )}
                </Card >
            </div >
        </div >
    );
}

export default Stock;
