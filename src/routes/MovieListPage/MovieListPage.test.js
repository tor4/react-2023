import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { MovieListPage } from "./MovieListPage"
import { SearchForm } from "@components";

describe('MovieListPage component', () => {
  let router;

  beforeEach(() => {
    const routes = [
      {
        path: "/",
        element: <MovieListPage />,
        loader: () => { return [] },
        children: [{
          path: '/',
          element: <SearchForm />,
        }],
      },
    ];

    router = createMemoryRouter(routes);
  });

  it('renders search by default', () => {
    render(<RouterProvider router={router} />);

    const search = screen.getByRole('textbox');
    expect(search).toBeInTheDocument();
  })
})