import { useState } from "react";
import { Outlet, useLoaderData, useNavigate, useSearchParams } from "react-router-dom";

import { GenreSelect } from '../../Components/GenreSelect/GenreSelect';
import { SortControl } from '../../Components/SortControl/SortControl';
import { MovieTile } from '../../Components/MovieTile/MovieTile';
import { genres } from '../../Utils/constants';
import { convertToMovieModel, getMovies } from '../../Utils/utils';

import './MovieListPage.css';

let controller = null;

export async function loader({ request }) {
  if (controller) {
    controller.abort();
  }

  controller = new AbortController();
  const searchParams = new URL(request.url).searchParams;

  const params = {
    sortBy: searchParams.get('sortBy'),
    search: searchParams.get('search'),
    filter: searchParams.get('filter'),
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

  const [sortCriterion, setSortCriterion] = useState(searchParams.get('sortBy') || 'release_date');
  const [activeGenre, setActiveGenre] = useState(searchParams.get('filter') || '');

  const handleGenreSelect = (genre) => {
    const filter = genre === 'All' ? null : genre;
    setActiveGenre(filter);

    if (filter === null) {
      searchParams.delete('filter');
    } else {
      searchParams.set('filter', filter);
    }
    setSearchParams(searchParams);
  }

  const handleSortCriterionChange = (sortCriterion) => {
    setSortCriterion(sortCriterion);

    searchParams.set('sortBy', sortCriterion);
    setSearchParams(searchParams);
  }

  return (
    <>
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
            />
          ))}
        </div>
      </main>
    </>
  )
}