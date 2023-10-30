import {
  Links,
  LiveReload,
  Meta,
  Scripts,
} from "@remix-run/react";
import { MovieListPage } from "../src/routes/MovieListPage/MovieListPage";

export { loader } from "../src/routes/MovieListPage/MovieListPage";
export { links } from './styles';

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="./favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <link
          rel="icon"
          href="data:image/x-icon;base64,AA"
        />
        <title>React App</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="App">
          <MovieListPage />
        </div>

        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
