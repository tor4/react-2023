import { loader, MovieHeader } from '../../src/routes/MovieHeader/MovieHeader';
import styles from '../../src/routes/MovieHeader/MovieHeader.css';

export const links = () => [
  { rel: "stylesheet", href: styles },
];

export { loader };

export default MovieHeader;