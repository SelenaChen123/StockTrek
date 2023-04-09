import "../styles/SearchBar.css"

function SearchBar({ query, searchClick }) {
    const industries = ["industry 1", "industry 2"];

    return (
        <div id="search">
            <select class="industry-dropdown">
                <option value="">-- Select Industry --</option>
                {industries.map((industry, i) => {
                    return <option key={i} value={industry}>{industry}</option>
                })}
            </select>
            <input class="search-bar" type="text" value={query} />
            <button class="search-btn" onClick={searchClick}>Search</button>
        </div>
    );
}

export default SearchBar;
