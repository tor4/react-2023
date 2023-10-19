import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchForm } from '../../Components/SearchForm/SearchForm';
import './SearchHeader.css';

export function SearchHeader() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const handleSearch = (query) => {
    setSearchQuery(query);

    searchParams.set('search', query);
    setSearchParams(searchParams);
  }

  return (<header className='search-container container'>
    <h2>Find your movie</h2>
    <SearchForm
      query={searchQuery}
      onSearch={handleSearch}
      placeholder={'What do you want to watch?'}
    />
  </header>);
}