import { useState } from "react";
import { ActionFunctionArgs, Outlet, useLoaderData, useNavigate, useSearchParams } from "react-router-dom";

import { GenreSelect, SortControl, MovieTile } from '@components';
import { SEARCH_PARAMS, genres } from '@utils/constants';
import { convertToMovieModel, getMovies } from '@utils/utils';

import './MovieListPage.css';
import { Movie, Response } from "@utils/types";

let controller: AbortController = null;

export async function loader({ request }: ActionFunctionArgs) {
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

  const movies = await getMovies(params, { signal: controller.signal })
    .then(({ data }: Response<Movie[]>) => {
      const movies = data.map((movie: Movie) => convertToMovieModel(movie));
      controller = null;
      return movies;
    }).catch((e: Error) => {
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
  const movieList: unknown = useLoaderData();

  const [sortCriterion, setSortCriterion] = useState(searchParams.get(SEARCH_PARAMS.SORT_BY) || 'release_date');
  const [activeGenre, setActiveGenre] = useState(searchParams.get(SEARCH_PARAMS.GENRE) || null);

  const handleGenreSelect = (genre: string) => {
    const filter = genre === 'All' ? null : genre;
    setActiveGenre(filter);

    if (filter === null) {
      searchParams.delete(SEARCH_PARAMS.GENRE);
    } else {
      searchParams.set(SEARCH_PARAMS.GENRE, filter);
    }
    setSearchParams(searchParams);
  }

  const handleSortCriterionChange = (sortCriterion: string) => {
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
          {(movieList as Movie[]).map((movie: Movie) => (
            <MovieTile key={movie.id} movie={movie}
              onSelect={(movie: Movie) => {
                window.scrollTo(0, 0);
                navigate(`/movies/${movie.id}?${searchParams.toString()}`);
              }}
              onEdit={(movie: Movie) => {
                navigate(`/movies/${movie.id}/edit?${searchParams.toString()}`);
              }}
            />
          ))}
        </div>
      </main>
    </div>
  )
}