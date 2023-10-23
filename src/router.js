import {
  createBrowserRouter,
} from "react-router-dom";
import App from './App';
import { loader as moviesLoader } from './routes/MovieListPage/MovieListPage';
import { SearchHeader } from "./routes/SearchHeader/SearchHeader";
import { MovieHeader, loader as movieLoader } from "./routes/MovieHeader/MovieHeader";
import { AddMovieForm, addMovieAction } from "./routes/AddMovieForm/AddMovieForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: moviesLoader,
    children: [{
      path: '/',
      element: <SearchHeader />,
      children: [{
        path: '/new',
        element: <AddMovieForm />,
        action: addMovieAction,
      }],
    }, {
      path: 'movies/:movieId',
      element: <MovieHeader />,
      loader: movieLoader,
    }],
  },
]);