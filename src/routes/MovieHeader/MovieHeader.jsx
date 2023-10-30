import { Link, useLoaderData, useLocation } from '@remix-run/react';
import { MovieDetails } from '../../Components/MovieDetails/MovieDetails';
import './MovieHeader.css';
import { convertToMovieModel, getMovie } from '../../Utils/utils';

export async function loader({ params }) {
  const movie = await getMovie(params.movieId);
  return convertToMovieModel(movie);
}

export function MovieHeader() {
  const movie = useLoaderData();
  const { search } = useLocation();

  return (
    <header className='details-container container'>
      <Link to={`/${search}`}
        className='icon search'
      ></Link>
      <MovieDetails {...movie} />
    </header>
  )
}