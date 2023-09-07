import { useState } from "react";

export function SearchForm({ query, onSearch }) {
  const [searchQuery, setSearchQuery] = useState(query || "");

  function handleSearch() {
    onSearch(searchQuery);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <input
        type="text"
        value={searchQuery}
        name="searchQuery"
        placeholder="Search"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="button" className="btn" onClick={handleSearch}>
        Search
      </button>
    </form>
  );
}

