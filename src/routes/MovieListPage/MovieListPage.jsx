import { useState } from "react";
import { Link, Outlet, useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";

import { GenreSelect } from '../../Components/GenreSelect/GenreSelect';
import { SortControl } from '../../Components/SortControl/SortControl';
import { MovieTile } from '../../Components/MovieTile/MovieTile';
import { SEARCH_PARAMS, genres } from '../../Utils/constants';
import { convertToMovieModel, getMovies } from '../../Utils/utils';

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
  const movieList = useLoaderData() || [];

  const [sortCriterion, setSortCriterion] = useState(searchParams.get(SEARCH_PARAMS.SORT_BY) || 'release_date');
  const [activeGenre] = useState(searchParams.get(SEARCH_PARAMS.GENRE) || null);

  const handleSortCriterionChange = (sortCriterion) => {
    setSortCriterion(sortCriterion);

    searchParams.set(SEARCH_PARAMS.SORT_BY, sortCriterion);
    setSearchParams(searchParams);
  }

  return (
    <>
      <Outlet />
      <main className='container'>
        <div className='filters'>
          <GenreSelect genres={genres} selected={activeGenre} />
          <SortControl selected={sortCriterion} onChange={handleSortCriterionChange} />
        </div>
        <hr />
        <div className='movie-list'>
          {movieList?.map((movie) => (
            <Link key={movie.id} to={`/movies/${movie.id}?${searchParams.toString()}`}>
              <MovieTile movie={movie}
                onSelect={(movie) => {
                  window.scrollTo(0, 0);
                  // navigate(`/movies/${movie.id}?${searchParams.toString()}`);
                }}
                onEdit={(movie) => {
                  navigate(`/movies/${movie.id}/edit?${searchParams.toString()}`);
                }}
              />
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}