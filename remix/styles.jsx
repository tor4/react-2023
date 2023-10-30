import indexStyles from "../src/index.css";
import appStyles from "../src/App.css";
import MovieListPageStyles from "../src/routes/MovieListPage/MovieListPage.css";
import GenreSelectStyles from "../src/Components/GenreSelect/GenreSelect.css";
import MovieDetailsStyled from "../src/Components/MovieDetails/MovieDetails.css";
import MovieTileStyles from "../src/Components/MovieTile/MovieTile.css";
import SearchFormStyles from "../src/Components/SearchForm/SearchForm.css";
import SelectStyles from "../src/Components/Select/Select.css";
import SortControlStyles from "../src/Components/SortControl/SortControl.css";

export const links = () => [
  { rel: "stylesheet", href: indexStyles },
  { rel: "stylesheet", href: appStyles },
  { rel: "stylesheet", href: MovieListPageStyles },
  { rel: "stylesheet", href: GenreSelectStyles },
  { rel: "stylesheet", href: MovieDetailsStyled },
  { rel: "stylesheet", href: MovieTileStyles },
  { rel: "stylesheet", href: SearchFormStyles },
  { rel: "stylesheet", href: SelectStyles },
  { rel: "stylesheet", href: SortControlStyles },
];