import { render, screen } from "@testing-library/react"
import { MovieListPage } from "./MovieListPage"

describe('MovieListPage component', () => {
  it('renders search by default', () => {
    render(<MovieListPage />);

    const search = screen.getByRole('textbox');
    expect(search).toBeInTheDocument();
  })
})