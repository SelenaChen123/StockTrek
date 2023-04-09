import Card from "./components/Card";
import Navbar from "./components/Navbar";
import NetChange from "./components/NetChange"
import "./styles/Home.css";
import { RxTriangleLeft } from "react-icons/rx";
import { RxTriangleRight } from "react-icons/rx";

function Home() {
    return (
        <>
        <Navbar />
        <div className="Home">
            <Card width="800px">
                <div className="row space-out">
                    <div className="row">
                        <h2 id="total-investments">Total Investments:</h2>
                        <h2>$20,000</h2>
                    </div>
                    <div className="row-right">
                        <h1 id="date">04/08/2023</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="row">
                        <h2 id="total-in-stock-trek">Total in Stock Trek:</h2>
                        <h2>$0</h2>
                    </div>
                </div>
                <div className="row space-out" id="range">
                    <NetChange change="6000" />
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
                <div className="simulate row center">
                    <div className="row skip">
                        <div className="skip-icon">
                            <RxTriangleLeft size={35} />
                        </div>
                        <div className="skip-icon">
                            <RxTriangleLeft size={35} />
                        </div>
                        <div className="skip-icon">
                            <RxTriangleLeft size={35} />
                        </div>
                    </div>
                    <div className="row skip">
                        <div className="skip-icon">
                            <RxTriangleLeft size={35} />
                        </div>
                        <div className="skip-icon">
                            <RxTriangleLeft size={35} />
                        </div>
                    </div>
                    <div className="row skip">
                        <div className="skip-icon">
                            <RxTriangleRight size={35} />
                        </div>
                        <div className="skip-icon">
                            <RxTriangleRight size={35} />
                        </div>
                    </div>
                    <div className="row skip">
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
                    <div className="featured" id="stocks">
                        <center><h3>Featured Stocks</h3></center>
                        <div className="list">
                            <div>
                                <h4>Stock 1</h4>
                            </div>
                            <div>
                                <h4>Stock 2</h4>
                            </div>
                            <div>
                                <h4>Stock 3</h4>
                            </div>
                        </div>
                    </div>
                    <div className="featured" id="news">

                    </div>
                </div>
            </Card>
        </div>
        </>
    );
}

export default Home;
