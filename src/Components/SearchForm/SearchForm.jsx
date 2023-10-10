import { useState } from "react";
import PropTypes from 'prop-types';
import './SearchForm.css';

export function SearchForm({ query, placeholder, onSearch }) {
  const [searchQuery, setSearchQuery] = useState(query || "");

  function handleSearch(e) {
    e.preventDefault();
    onSearch(searchQuery);
  }

  return (
    <form
      className="SearchForm"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        value={searchQuery}
        name="searchQuery"
        placeholder={placeholder}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" data-cy="search-form-subnit" className="primary">
        Search
      </button>
    </form>
  );
}

SearchForm.propTypes = {
  query: PropTypes.string,
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
}
