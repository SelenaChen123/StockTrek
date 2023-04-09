import { useState } from "react";

import SearchBar from "./components/SearchBar";

function News({ from, to }) {
    const apiKey = "50136caef50048e9b73baf2f9c57a9bf";
    const [query, setQuery] = useState("");
    const pageSize = 10;
    const page = 2;
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&from=${from}&to=${to}&pageSize=${pageSize}&page=${page}`;

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const searchClick = () => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const articles = data.articles;
                console.log(articles);
            })
            .catch(error => console.error(error))
    };

    return (
        <div>
            <SearchBar query={query} handleInputChange={handleInputChange} searchClick={searchClick} />
        </div>
    );
}

export default News;
