import { useState } from "react";
import cheerio from "cheerio";
import axios from "axios";

import SearchBar from "./components/SearchBar";
import Card from "./components/Card";
import NewsTiles from "./components/NewsTiles";

import "./styles/News.css"

function News({ from, to }) {

    const [query, setQuery] = useState("");
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent("nCino")}&tbm=nws`;

    axios.get(searchUrl)
        .then(response => {
            const $ = cheerio.load(response.data);

            const articles = $('div.g');

            articles.each((index, article) => {
            const title = $(article).find('h3').text();
            const url = $(article).find('a').attr('href');
            const description = $(article).find('div.st').text();

            console.log(`Title: ${title}`);
            console.log(`URL: ${url}`);
            console.log(`Description: ${description}\n`);
            });
        })
        .catch(error => {
            console.log(error);
        });

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const [articles, setArticles] = useState("");

    const searchClick = () => {
        
    };

    return (
        <div class="vstack">
            <div class="nav-space">
                <SearchBar query={query} handleInputChange={handleInputChange} searchClick={searchClick} />
            </div>
            <Card width="800px">
                <NewsTiles artiles={articles} />
            </Card>
        </div>
    );
}

export default News;
