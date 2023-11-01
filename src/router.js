import {
  createBrowserRouter,
} from "react-router-dom";
import { MovieListPage, loader as moviesLoader } from './routes/MovieListPage/MovieListPage';
import { SearchHeader } from "./routes/SearchHeader/SearchHeader";
import { MovieHeader, loader as movieLoader } from "./routes/MovieHeader/MovieHeader";
import { AddMovieForm, addMovieAction } from "./routes/AddMovieForm/AddMovieForm";
import { EditMovieForm, action as editMovieAction } from "./routes/EditMovieForm/EditMovieForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MovieListPage />,
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
    }, {
      path: 'movies/:movieId/edit',
      element: <EditMovieForm />,
      loader: movieLoader,
      action: editMovieAction,
    }],
  },
]);