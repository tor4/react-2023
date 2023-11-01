import { render, screen, fireEvent } from '@testing-library/react';
import { MovieTile } from './MovieTile';
import { NO_IMAGE_URL } from '@utils/constants';

describe('MoviewTile component', () => {
  const movie = {
    imageUrl: 'http://host/any_image_url',
    name: 'movie name',
    releaseYear: 1999,
    genres: ['Drama', 'Fantasy', 'Crime'],
  };

  it('should render image', () => {
    render(<MovieTile movie={movie} />);

    const image = screen.getByRole('img');

    expect(image.src).toBe(movie.imageUrl);
  });

  it('should render default image if not passed', () => {
    const movieWithoutImage = { ...movie, imageUrl: undefined };
    render(<MovieTile movie={movieWithoutImage} />);

    const image = screen.getByRole('img');

    expect(image.src).toBe(NO_IMAGE_URL);
  });

  it('should display name', () => {
    render(<MovieTile movie={movie} />);

    expect(screen.getByText(movie.name)).toBeInTheDocument();
  });

  it('should display release year', () => {
    render(<MovieTile movie={movie} />);

    expect(screen.getByText(movie.releaseYear)).toBeInTheDocument();
  });

  it('should display genres', () => {
    render(<MovieTile movie={movie} />);

    expect(screen.getByText(movie.genres.join(', '))).toBeInTheDocument();
  });

  it('should call onSelect handler after clicking on tile', () => {
    const onSelect = jest.fn();

    render(<MovieTile movie={movie} onSelect={onSelect} />);

    const tile = screen.getByRole('article');
    fireEvent.click(tile);

    expect(onSelect).toBeCalledWith(movie);
  });
})