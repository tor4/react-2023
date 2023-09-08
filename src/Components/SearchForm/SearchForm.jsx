import { useState } from "react";

export function SearchForm({ query, onSearch }) {
  const [searchQuery, setSearchQuery] = useState(query || "");

  function handleSearch(e) {
    debugger;
    e.preventDefault();
    onSearch(searchQuery);
  }

  return (
    <form
      onSubmit={handleSearch}
    >
      <input
        type="text"
        value={searchQuery}
        name="searchQuery"
        placeholder="Search"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" data-cy="search-form-subnit" className="btn">
        Search
      </button>
    </form>
  );
}

