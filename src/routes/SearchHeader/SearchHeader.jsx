import { useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { SearchForm } from '../../Components/SearchForm/SearchForm';
import './SearchHeader.css';
import { SEARCH_PARAMS } from "../../Utils/constants";

export function SearchHeader() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get(SEARCH_PARAMS.QUERY) || '');
  const handleSearch = (query) => {
    setSearchQuery(query);

    searchParams.set(SEARCH_PARAMS.QUERY, query);
    setSearchParams(searchParams);
  }

  return (
    <header className='search-container container'>
      <button className='secondary add-movie'
        onClick={() => {
          navigate(`/new?${searchParams.toString()}`)
        }}>+ Add movie</button>
      <Outlet />
      <h2>Find your movie</h2>
      <SearchForm
        query={searchQuery}
        onSearch={handleSearch}
        placeholder='What do you want to watch?'
      />
    </header>);
}