import { useEffect, useRef, useState } from "react";
import { SearchForm } from '../SearchForm/SearchForm';
import { MovieDetails } from '../MovieDetails/MovieDetails';
import { GenreSelect } from '../GenreSelect/GenreSelect';
import { SortControl } from '../SortControl/SortControl';
import { MovieTile } from '../MovieTile/MovieTile';
import { genres } from 'utils/constants';
import { getMovies } from 'utils/utils';

import './MovieListPage.css';

export function MovieListPage(props) {
  let controller = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriterion, setSortCriterion] = useState('title');
  const [activeGenre, setActiveGenre] = useState('All');
  const [movieList, setMovieList] = useState(props.movieList || []);
  const [selectedMovie, setSelectedMovie] = useState(props.selectedMovie);

  useEffect(() => {
    if (controller.current) {
      controller.current.abort();
    }

    controller.current = new AbortController();

    const params = {
      sortBy: sortCriterion,
      search: searchQuery,
      genres: activeGenre,
      limit: 9,
    };

    getMovies(params, { signal: controller.current.signal }).then(({ data }) => {
      const movies = data.map((movie) => ({
        id: movie.id,
        name: movie.title,
        description: movie.overview,
        imageUrl: movie.poster_path,
        releaseYear: new Date(movie.release_date).getFullYear(),
        duration: movie.runtime,
        rating: movie.vote_average,
        genres: movie.genres,
      }));

      setMovieList(movies);
      controller.current = null;
    }).catch((e) => {
      if (e.name === 'AbortError') {
        return;
      }
      throw e;
    })
  }, [searchQuery, sortCriterion, activeGenre]);

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
            <MovieTile key={movie.id} movie={movie}
              onSelect={(movie) => {
                setSelectedMovie(movie);
                window.scrollTo(0, 0);
              }}
            />
          ))}
        </div>
      </main>
    </>
  )
}