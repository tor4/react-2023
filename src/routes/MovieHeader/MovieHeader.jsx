import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { MovieDetails } from '@components';
import './MovieHeader.css';
import { convertToMovieModel, getMovie } from '@utils/utils';

export async function loader({ params }) {
  const movie = await getMovie(params.movieId);
  return convertToMovieModel(movie);
}

export function MovieHeader() {
  const movie = useLoaderData();
  const { search } = useLocation();
  const navigate = useNavigate();

  return (
    <header className='details-container container'>
      <button to="/"
        className='icon search'
        onClick={() => navigate(`/${search}`)}
      ></button>
      <MovieDetails {...movie} />
    </header>
  )
}