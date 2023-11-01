import { useState } from "react";
import { Outlet, useLoaderData, useNavigate, useSearchParams } from "react-router-dom";

import { GenreSelect, SortControl, MovieTile } from '@components';
import { SEARCH_PARAMS, genres } from '@utils/constants';
import { convertToMovieModel, getMovies } from '@utils/utils';

import './MovieListPage.css';

let controller = null;

export async function loader({ request }) {
  controller?.abort();

  controller = new AbortController();
  const searchParams = new URL(request.url).searchParams;

  const params = {
    sortBy: searchParams.get(SEARCH_PARAMS.SORT_BY) || 'release_date',
    search: searchParams.get(SEARCH_PARAMS.QUERY),
    filter: searchParams.get(SEARCH_PARAMS.GENRE),
    sortOrder: 'desc',
    searchBy: 'title',
    limit: 9,
  };

  const movies = await getMovies(params, { signal: controller.signal }).then(({ data }) => {
    const movies = data.map((movie) => convertToMovieModel(movie));
    controller = null;
    return movies;
  }).catch((e) => {
    if (e.name === 'AbortError') {
      return;
    }
    throw e;
  })

  return movies;
};

export function MovieListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const movieList = useLoaderData();

  const [sortCriterion, setSortCriterion] = useState(searchParams.get(SEARCH_PARAMS.SORT_BY) || 'release_date');
  const [activeGenre, setActiveGenre] = useState(searchParams.get(SEARCH_PARAMS.GENRE) || null);

  const handleGenreSelect = (genre) => {
    const filter = genre === 'All' ? null : genre;
    setActiveGenre(filter);

    if (filter === null) {
      searchParams.delete(SEARCH_PARAMS.GENRE);
    } else {
      searchParams.set(SEARCH_PARAMS.GENRE, filter);
    }
    setSearchParams(searchParams);
  }

  const handleSortCriterionChange = (sortCriterion) => {
    setSortCriterion(sortCriterion);

    searchParams.set(SEARCH_PARAMS.SORT_BY, sortCriterion);
    setSearchParams(searchParams);
  }

  return (
    <div className="App">
      <Outlet />
      <main className='container'>
        <div className='filters'>
          <GenreSelect genres={genres} selected={activeGenre}
            onSelect={handleGenreSelect} />
          <SortControl selected={sortCriterion} onChange={handleSortCriterionChange} />
        </div>
        <hr />
        <div className='movie-list'>
          {movieList.map((movie) => (
            <MovieTile key={movie.id} movie={movie}
              onSelect={(movie) => {
                window.scrollTo(0, 0);
                navigate(`/movies/${movie.id}?${searchParams.toString()}`);
              }}
              onEdit={(movie) => {
                navigate(`/movies/${movie.id}/edit?${searchParams.toString()}`);
              }}
            />
          ))}
        </div>
      </main>
    </div>
  )
}