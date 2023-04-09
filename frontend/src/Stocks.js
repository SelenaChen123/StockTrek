import { LineChart, Line, XAxis, YAxis } from 'recharts';
import Card from "./components/Card";
import { useEffect, useState } from 'react';
import "./styles/Stocks.css";
import { Link } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa"
import NetChange from './components/NetChange';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';

function Search({ search, onSearch }) {
    return null;
}

function Pagination({ currPage, onSwitchTo }) {
    const numPages = 31;
    return (
        <div className="pagination">
            <div className="page-buttons">
                <PageSwitchButton currPage={currPage} value={"prev"} enabled={currPage > 1} onSwitchTo={onSwitchTo} />
                <PageSwitchButton currPage={currPage} value={currPage} enabled />
                <PageSwitchButton currPage={currPage} value={"next"} enabled={currPage < numPages} onSwitchTo={onSwitchTo} />
            </div>
        </div>
    );
}

function PageSwitchButton({ currPage, value, enabled, onSwitchTo }) {
    let switchTo;
    let displayed;
    if (typeof value === "number") {
        switchTo = value;
        displayed = value.toString();
    } else if (value === "next") {
        switchTo = currPage + 1;
        displayed = "Next ❯";
    } else {
        switchTo = currPage - 1;
        displayed = "❮ Previous";
    }

    const linkClasses = ["page-button", switchTo === currPage ? "selected-page" : (switchTo < currPage ? "left-of-current" : "right-of-current")].join(" ");

    return enabled
        ? (
            <div
                className={linkClasses}
                onClick={() => { if (switchTo !== value) onSwitchTo(switchTo) }}
            >
                {displayed}
            </div>
        )
        : (
            <div className="page-button disabled-arrow">{displayed}</div>
        );
}

function Stock({ stock }) {
    stock.Values.forEach(val => val.Value = Math.round(val.Value * 100) / 100)
    const min = stock.Values.reduce((min, val) => Math.min(min, val.Value), Number.MAX_VALUE, stock.Values);
    const max = stock.Values.reduce((max, val) => Math.max(max, val.Value), Number.MIN_VALUE, stock.Values);
    const change = ((stock.Values[stock.Values.length - 1].Value / stock.Values[stock.Values.length - 2].Value) - 1) * 100;
    const roundedChange = Math.round(change * 100) / 100;
    return (
        <Link to={`/stocks/${stock.Ticker}`} className="stock-row">
            <div className="stock-company">{stock.Company} (<b>{stock.Ticker}</b>)</div>
            {/* <div style={{fontSize: "1rem", width: "180px", paddingRight: "30px"}}>{stock.Industry}</div> */}
            <div className="stock-netchange"><NetChange change={roundedChange.toString()} fontSize="16px" /></div>
            <div className="stock-chart">
                <LineChart width={300} height={100} data={stock.Values} margin={{ bottom: 0 }}>
                    <Line type="monotone" dataKey="Value" stroke="#8884d8" />
                    <XAxis dataKey="Date" tick={false} />
                    <YAxis domain={[min, max]} padding={{ bottom: 0 }} />
                </LineChart>
            </div>
            <div className="stock-right-arrow"><FaAngleRight /></div>
        </Link>
    )
}

function Stocks() {
    const [currPage, setCurrPage] = useState(1);
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);

    function fetchData(search, currPage) {
        fetch(`http://localhost:8080/stocks?search=${search}&currentDate=2023-04-05&pageNum=${currPage}`).then(res => res.json()).then(data => setData(data.data))
    }

    useEffect(() => {
        // fetch("http://localhost:8080/user-data?username=alex").then(res => res.json()).then(val => {
        //     const date = val.CurrentSimDate;
        //     fetch(`http://localhost:8080/stocks?search=${search}&currentDate=${date}`).then(res => res.json()).then(setData)
        // })
        fetchData('', currPage)
    }, [currPage])

    return (
        <div>
            <Navbar />
            <div className="Home">
                <Card width="1200px">
                    <SearchBar query={search} handleInputChange={e => setSearch(e.target.value)} searchClick={() => fetchData(search, currPage)} />
                    {data?.map(val => <Stock stock={val} />)}

                    <Pagination currPage={currPage} onSwitchTo={setCurrPage} />
                </Card>
            </div>
        </div>
    );
}

export default Stocks;
