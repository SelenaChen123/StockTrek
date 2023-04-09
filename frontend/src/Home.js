import Navbar from "./components/Navbar";
import Card from "./components/Card";
import NetChange from "./components/NetChange";
import "./styles/Home.css";
import { RxTriangleLeft } from "react-icons/rx";
import { RxTriangleRight } from "react-icons/rx";
import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { redirect, useNavigate } from "react-router-dom";

function Home() {
    const [userData, setUserData] = useState(null);
    const [featuredStocks, setFeaturedStocks] = useState([]);
    const [daysBack, setDaysBack] = useState(7);
    const navigate = useNavigate();

    function updateStocks(days) {
        const username = localStorage.getItem("username")
        fetch("http://localhost:8080/update-stocks", {
            method: "PUT",
            body: JSON.stringify({ username: username, days }),
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
        if (localStorage.getItem("username") == null) {
            navigate("/login", { replace: true })
        }
        const username = localStorage.getItem("username")
        fetch(`http://localhost:8080/user-data?username=${username}`).then(res => res.json()).then(data => {
            setUserData(data)
        })
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
                    {userData.NetProfits.length === 0 ? (
                        <h2 style={{ margin: "70px auto" }}>Invest in some stocks to see your portfolio summary! </h2>
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
                                <LineChart width={600} height={300} data={dataShown} margin={{ bottom: 0 }}>
                                    <Line type="monotone" dataKey="Value" stroke="#8884d8" />
                                    <XAxis dataKey="Date" tick={false} />
                                    <YAxis padding={{ bottom: 0 }} />
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
                            <center><h3>Featured Stocks</h3></center>
                            <div style={{ marginTop: "40px" }}>
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
                                                <LineChart width={160} height={80} data={featured.Values} margin={{ bottom: 0 }}>
                                                    <Line type="monotone" dataKey="Value" stroke="#8884d8" />
                                                    <XAxis dataKey="Date" tick={false} />
                                                    <YAxis tick={false} domain={[min, max]} padding={{ bottom: 0 }} />
                                                </LineChart>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="featured">
                            <center><h3>Featured News</h3></center>
                            <div style={{ marginTop: "40px" }}>
                                <div className="row list-item">
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.cnn.com/2023/04/07/economy/march-jobs-report-final/index.html">
                                        <div>
                                            <h4>A labor market cooldown: US economy added just 236,000 jobs in March</h4>
                                            <p>US employers added just 236000 jobs in March, coming in below expectations and indicating that the labor market is cooling off amid the...</p>
                                        </div>
                                    </a>
                                    <div className="placeholder" style={{ width: "120px", height: "80px" }}>
                                        <img img style={{ width: "90px", height: "80px" }} src="https://media.cnn.com/api/v1/images/stellar/prod/230324160207-commercial-real-estate-file-2022.jpg?c=16x9&q=h_144,w_256,c_fill" alt="Image description" />
                                    </div>
                                </div>

                                <div className="row list-item">
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.cnn.com/2023/04/04/investing/dimon-jpmorgan-shareholder-letter/index.html">
                                        <div>
                                            <h4>JPMorgan's Jamie Dimon warns banking crisis will be felt for 'years to come'</h4>
                                            <p>The banking crisis triggered by the recent collapses of Silicon Valley Bank and Signature Bank is not over yet and will ripple through the...</p>
                                        </div>
                                    </a>
                                    <div className="placeholder" style={{ width: "120px", height: "80px" }}>
                                        <img img style={{ width: "90px", height: "80px" }} src="https://media.cnn.com/api/v1/images/stellar/prod/230403184038-jamie-dimon-march-6.jpg?c=16x9&q=h_720,w_1280,c_fill" alt="Image description" />
                                    </div>
                                </div>
                                <div className="row list-item">
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.cnn.com/2023/04/03/investing/dogecoin-elon-musk-twitter/index.html">
                                        <div>
                                            <h4>Dogecoin jumps after Elon Musk replaces Twitter bird with Shiba Inu</h4>
                                            <p>Twitter's traditional bird icon was booted and replaced with an image of a Shiba Inu, an apparent nod to dogecoin, the joke cryptocurrency...</p>
                                        </div>
                                    </a>
                                    <div className="placeholder" style={{ width: "120px", height: "80px" }}>
                                        <img img style={{ width: "90px", height: "80px" }} src="https://media.cnn.com/api/v1/images/stellar/prod/220114042008-dogecoin-illustration-restricted.jpg?c=16x9&q=h_720,w_1280,c_fill" alt="Image description" />
                                    </div>
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
