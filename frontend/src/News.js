import { useState } from "react";

import NavBar from "./components/Navbar"
import SearchBar from "./components/SearchBar";
import Card from "./components/Card";
import NewsTiles from "./components/NewsTiles";

import "./styles/News.css"

function News({ from, to }) {

    const [query, setQuery] = useState("");
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent("nCino")}&tbm=nws`;

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const [articles, setArticles] = useState("");

    const searchClick = () => {
        
    };

    return (
        <>
            <NavBar />
            <div class="search-align">
                <SearchBar query={query} handleInputChange={handleInputChange} searchClick={searchClick} />
            </div>
            <div class="vstack">
                <Card width="1200px">
                    <NewsTiles artiles={articles} />
                </Card>
            </div>
        </>
    );
}

export default News;
