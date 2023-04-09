import Navbar from "./components/Navbar";
import Card from "./components/Card";
import NetChange from "./components/NetChange";
import "./styles/Home.css";
import { RxTriangleLeft } from "react-icons/rx";
import { RxTriangleRight } from "react-icons/rx";
import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useNavigate } from "react-router-dom";

function Home() {
    const [userData, setUserData] = useState(null);
    const [featuredStocks, setFeaturedStocks] = useState([]);
    const [daysBack, setDaysBack] = useState(7);
    const navigate = useNavigate();

    function updateStocks(days) {
        fetch("http://localhost:8080/update-stocks", {
            method: "PUT",
            body: JSON.stringify({ username: "alex", days }),
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.ok) {
                // navigate("/", { replace: true })
                fetchData()
            }
        })
    }

    const dataShown = useMemo(() => userData?.NetProfits?.slice(Math.max(0, userData.NetProfits.length - daysBack)), [daysBack, userData])

    function fetchData() {
        const username = "alex"
        fetch(`http://localhost:8080/user-data?username=${username}`).then(res => res.json()).then(data => setUserData(data))
        fetch(`http://localhost:8080/featured-stocks?username=${username}`).then(res => res.json()).then(data => setFeaturedStocks(data.data))
    }

    function calcDiff(arr) {
        const last = arr[arr.length - 1].Value;
        const secondLast = arr[arr.length - 2].Value
        const diff = (last - secondLast) / secondLast;
        return Math.round(diff * 100) / 100;
    }

    useEffect(() => {
        fetchData()
    }, []);

    if (userData === null) {
        return null;
    }

    return (
        <div>
            <Navbar />
            <div className="Home">
                <Card width="800px">
                    <div className="row space-out">
                        <div className="row">
                            <h2 id="total-investments">Total In Stock Trek:</h2>
                            <h2>${Math.round(userData.Money * 100) / 100}</h2>
                        </div>
                        <div className="row-right">
                            <h1 id="date">{userData.CurrentSimDate}</h1>
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="row">
                            <h2 id="total-in-stock-trek">Total in Stock Trek:</h2>
                            <h2>$0</h2>
                        </div>
                    </div> */}
                    {userData.NetProfits.length === 0 ? (
                        <h2 style={{ margin: "70px auto" }}>Invest in some stocks to see your portfolio summary!</h2>
                    ) : (
                        <>
                        <div className="row space-out" id="range">
                            <NetChange change={calcDiff(userData.NetProfits).toString()} fontSize="20px" />
                            <div className="row">
                                <div className={`range-times ${daysBack === 7 ? "range-selected" : ""}`} onClick={() => setDaysBack(7)}><div><p>1W</p></div></div>
                                <div className={`range-times ${daysBack === 30 ? "range-selected" : ""}`} onClick={() => setDaysBack(30)}><p>1M</p></div>
                                <div className={`range-times ${daysBack === 6 * 30 ? "range-selected" : ""}`} onClick={() => setDaysBack(6 * 30)}><p>6M</p></div>
                                <div className={`range-times ${daysBack === 365 ? "range-selected" : ""}`} onClick={() => setDaysBack(365)}><p>1Y</p></div>
                                <div className={`range-times ${daysBack === 365 * 3 ? "range-selected" : ""}`} onClick={() => setDaysBack(365 * 3)}><p>3Y</p></div>
                            </div>
                        </div>
                        <div className="Home-stock-chart">
                            <LineChart width={600} height={300} data={dataShown} margin={{bottom: 0}}>
                                <Line type="monotone" dataKey="Value" stroke="#8884d8" />
                                <XAxis dataKey="Date" tick={false} />
                                <YAxis padding={{bottom: 0}}/>
                            </LineChart>
                        </div>
                        </>
                    )}
                    <div className="simulate row center">
                        <div className="row skip" onClick={() => updateStocks(1)}>
                            <div className="skip-icon">
                                <RxTriangleRight size={35} />
                            </div>
                            <div className="skip-icon">
                                <RxTriangleRight size={35} />
                            </div>
                        </div>
                        <div className="row skip" onClick={() => updateStocks(5)}>
                            <div className="skip-icon">
                                <RxTriangleRight size={35} />
                            </div>
                            <div className="skip-icon">
                                <RxTriangleRight size={35} />
                            </div>
                            <div className="skip-icon">
                                <RxTriangleRight size={35} />
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="featured">
                            <center><h3>Notable Stocks From Your Portfolio</h3></center>
                            <div>
                                {featuredStocks.map(featured => {
                                    const min = featured.Values.reduce((min, val) => Math.min(min, val.Value), Number.MAX_VALUE);
                                    const max = featured.Values.reduce((max, val) => Math.max(max, val.Value), Number.MIN_VALUE);
                                    return (
                                        <div className="row list-item">
                                            <div>
                                                <h4>{featured.Company}</h4>
                                                <NetChange change={calcDiff(featured.Values).toString()} fontSize="10px" />
                                            </div>
                                            <div>
                                                <LineChart width={160} height={80} data={featured.Values} margin={{bottom: 0}}>
                                                    <Line type="monotone" dataKey="Value" stroke="#8884d8" />
                                                    <XAxis dataKey="Date" tick={false} />
                                                    <YAxis tick={false} domain={[min, max]} padding={{bottom: 0}}/>
                                                </LineChart>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="featured">
                            <center><h3>Featured News</h3></center>
                            <div>
                                <div className="row list-item">
                                    <div>
                                        <h4>News 1</h4>
                                        <p>News Description 1</p>
                                    </div>
                                    <div className="placeholder"></div>
                                </div>
                                <div className="row list-item">
                                    <div>
                                        <h4>News 2</h4>
                                        <p>News Description 2</p>
                                    </div>
                                    <div className="placeholder"></div>
                                </div>
                                <div className="row list-item">
                                    <div>
                                        <h4>News 3</h4>
                                        <p>News Description 3</p>
                                    </div>
                                    <div className="placeholder"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Home;
