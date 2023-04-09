import "../styles/SearchBar.css"

function SearchBar({ query, handleInputChange, searchClick }) {
    // const industries = ["industry 1", "industry 2"];
    return (
        <>
        <div class="search-wrapper">
            <div id="search">
                {/* <select className="industry-dropdown">
                    <option value="">-- Select Industry --</option>
                    {industries.map((industry, i) => {
                        return <option key={i} value={industry}>{industry}</option>;
                    })}
                </select> */}
                <input className="search-bar" type="text" value={query} onChange={handleInputChange} />
                <button className="search-btn" onClick={searchClick}>Search</button>
            </div>
        </div>
    </>
    );
}

export default SearchBar;