import {
  createBrowserRouter,
} from "react-router-dom";
import App from './App';
import { loader as moviesLoader } from './routes/MovieListPage/MovieListPage';
import { SearchHeader } from "./routes/SearchHeader/SearchHeader";
import { MovieHeader, loader as movieLoader } from "./routes/MovieHeader/MovieHeader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: moviesLoader,
    children: [{
      index: true,
      element: <SearchHeader />,
    }, {
      path: 'movies/:movieId',
      element: <MovieHeader />,
      loader: movieLoader,
    }],
  },
]);