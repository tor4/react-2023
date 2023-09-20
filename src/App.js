import {Counter, SearchForm, GenreSelect} from "./Components";
import "./App.css";
import { useState } from "react";

export default function App() {
  const [selected, setSelected] = useState("Comedy");
  const [query, setQuery] = useState('');
  const genres = ["All", "Documentary", "Comedy", "Horror", "Crime"];

  return (
    <div className="App">
      <h1>Module 1. Core concepts</h1>
      <h2>Counter</h2>
      <Counter count="5" />

      <h2>Search form</h2>
      <SearchForm query={query} onSearch={(e) => setQuery(e)} />
      <span data-cy="requested-query">Requested query: {query}</span>

      <h2>Genre select</h2>
      <GenreSelect
        genres={genres}
        selected={selected}
        onSelect={(e) => {
          setSelected(e);
        }}
      />
    </div>
  );
}
