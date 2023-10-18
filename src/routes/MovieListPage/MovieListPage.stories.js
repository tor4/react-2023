import { MovieListPage } from './MovieListPage';
import { Default as MovieDetails } from '../MovieDetails/MovieDetails.stories';
import '../../index.css';

export default {
  title: 'Page/MovieListPage',
  component: MovieListPage,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    movieList: [
      MovieDetails.args,
      MovieDetails.args,
      MovieDetails.args,
      MovieDetails.args,
      MovieDetails.args,
      MovieDetails.args,
    ],
  }
};

export const MovieSelected = {
  args: {
    selectedMovie: MovieDetails.args,
  }
}
