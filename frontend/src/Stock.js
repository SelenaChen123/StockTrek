import Navbar from "./components/Navbar";
import Card from "./components/Card";
import NetChange from "./components/NetChange";
import NewsTiles from "./components/NewsTiles";
import "./styles/Stock.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

function Stock() {
    const { stockTicker } = useParams();
    const [amount, setAmount] = useState(0);
    const [buy, setBuy] = useState(false);
    const [sell, setSell] = useState(false);
    const [stock, setStock] = useState(null);
    const [daysBack, setDaysBack] = useState(7);
    const [userData, setUserData] = useState(null);

    const dataShown = useMemo(() => stock?.data?.slice(Math.max(0, stock.data.length - daysBack)), [daysBack, stock])
    const min = dataShown?.reduce((min, val) => Math.min(min, val.Value), Number.MAX_VALUE);
    const max = dataShown?.reduce((max, val) => Math.max(max, val.Value), Number.MIN_VALUE);
    const last = () => Math.round(parseFloat(dataShown?.[dataShown.length - 1].Value) * 100) / 100;

    const username = localStorage.getItem("username")

    useEffect(() => {
        fetch(`http://localhost:8080/user-data?username=${username}`).then(res => res.json()).then(data => {
            fetch(`http://localhost:8080/stock/${stockTicker}?startDate=${"2018-01-01"}&endDate=${data.CurrentSimDate}`).then(res => res.json()).then(data => {
                setStock(data)
            });
            setUserData(data)
        })
    }, [stockTicker])

    const navigate = useNavigate();

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
    

    function commitSell() {
        fetch("http://localhost:8080/invest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, ticker: stockTicker, amount: -parseInt(amount) })
        }).then(res => {
            if (res.ok) {
                navigate("/", { replace: true })
            }
        })
    }

    function commitBuy() {
        fetch("http://localhost:8080/invest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, ticker: stockTicker, amount: parseInt(amount) })
        }).then(res => {
            if (res.ok) {
                navigate("/", { replace: true })
            }
        })
    }

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
        console.log(event.target.value);
    };

    function calcDiff(arr) {
        const last = arr[arr.length - 1].Value;
        const secondLast = arr[arr.length - 2].Value
        const diff = (last - secondLast) / secondLast;
        return Math.round(diff * 100) / 100;
    }

    if (stock === null) {
        return null;
    }

    return (
        <div>
            <Navbar />
            <div className="Stock">
                <Card width="800px">
                    {!buy && !sell && (
                        <div>
                            <div className="row center">
                                <h2 id="name">{stock.name}</h2>
                                <h2>({stock.ticker})</h2>
                            </div>
                                <h2 style={{textAlign: "center"}}>${last()}</h2>
                            <div className="row space-out" id="range">
                                <NetChange change={calcDiff(stock.data).toString()} fontSize="20px" />
                                <div className="row">
                                    <div className={`range-times ${daysBack === 7 ? "range-selected" : ""}`} onClick={() => setDaysBack(7)}><div><p>1W</p></div></div>
                                    <div className={`range-times ${daysBack === 30 ? "range-selected" : ""}`} onClick={() => setDaysBack(30)}><p>1M</p></div>
                                    <div className={`range-times ${daysBack === 6 * 30 ? "range-selected" : ""}`} onClick={() => setDaysBack(6 * 30)}><p>6M</p></div>
                                    <div className={`range-times ${daysBack === 365 ? "range-selected" : ""}`} onClick={() => setDaysBack(365)}><p>1Y</p></div>
                                    <div className={`range-times ${daysBack === 365 * 3 ? "range-selected" : ""}`} onClick={() => setDaysBack(365 * 3)}><p>3Y</p></div>
                                </div>
                            </div>
                            <div className="Home-stock-chart">
                                <LineChart width={600} height={300} data={dataShown} margin={{ bottom: 0 }}>
                                    <Line type="monotone" dataKey="Value" stroke="#8884d8" />
                                    <XAxis dataKey="Date" tick={false} />
                                    <YAxis domain={[min, max]} padding={{ bottom: 0 }} />
                                </LineChart>
                            </div>
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
                                    <input type="text" value={amount} onChange={handleAmountChange} />
                                    <p>shares (${last()}/share)</p>
                                </div>
                                <div className="button" id="buy" onClick={commitBuy}>
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
                                    <p>shares (${last()}/share)</p>
                                </div>
                                <div className="button" id="sell" onClick={commitSell}>
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
