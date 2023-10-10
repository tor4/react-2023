import { useState } from "react";
import { SearchForm } from '../SearchForm/SearchForm';
import { MovieDetails } from '../MovieDetails/MovieDetails';
import { GenreSelect } from '../GenreSelect/GenreSelect';
import { SortControl } from '../SortControl/SortControl';
import { MovieTile } from '../MovieTile/MovieTile';
import { genres } from 'utils/constants';

import './MovieListPage.css';

export function MovieListPage(props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriterion, setSortCriterion] = useState(null);
  const [activeGenre, setActiveGenre] = useState('All');
  const [movieList, setMovieList] = useState(props.movieList || []);
  const [selectedMovie, setSelectedMovie] = useState(props.selectedMovie);

  let header;

  if (selectedMovie) {
    header = (<header className='details-container container'>
      <button
        className='icon search'
        onClick={() => setSelectedMovie(null)}
      ></button>
      <MovieDetails {...selectedMovie} />
    </header>);
  } else {
    header = (<header className='search-container container'>
      <h2>Find your movie</h2>
      <SearchForm
        query={searchQuery}
        onSearch={setSearchQuery}
        placeholder={'What do you want to watch?'}
      />
    </header>)
  }

  return (
    <>
      {header}
      <main className='container'>
        <div className='filters'>
          <GenreSelect genres={genres} selected={activeGenre} onSelect={setActiveGenre} />
          <SortControl selected={sortCriterion} onChange={setSortCriterion} />
        </div>
        <hr />
        <div className='movie-list'>
          {movieList.map((movie) => (
            <MovieTile movie={movie}
              onSelect={setSelectedMovie}
            />
          ))}
        </div>
      </main>
    </>
  )
}