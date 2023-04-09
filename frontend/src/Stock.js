import Navbar from "./components/Navbar";
import Card from "./components/Card";
import NetChange from "./components/NetChange";
import NewsTiles from "./components/NewsTiles";
import "./styles/Stock.css";

function Stock() {
    return (
        <div>
            <Navbar />
            <div className="Stock">
                <Card width="800px">
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
                </Card >
            </div>
        </div>
    );
}

export default Stock;
