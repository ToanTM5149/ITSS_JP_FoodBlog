import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    alert(`Searching for: ${query}`);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search blogs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
