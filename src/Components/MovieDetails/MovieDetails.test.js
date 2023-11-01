import { render, screen } from "@testing-library/react";
import { MovieDetails } from './MovieDetails';
import { NO_IMAGE_URL } from "@utils/constants";

describe('MovieDetails component', () => {
  const movie = {
    imageUrl: 'http://host/any_image_url',
    name: 'movie name',
    releaseYear: 1999,
    genres: ['Drama', 'Fantasy', 'Crime'],
    rating: 9.1,
    duration: 189,
    description: "description",
  };

  it('should render image', () => {
    render(<MovieDetails {...movie} />);

    const image = screen.getByRole('img');

    expect(image.src).toBe(movie.imageUrl);
  });

  it('should render default message if not passed', () => {
    render(<MovieDetails name={movie.name} />);

    const image = screen.getByRole('img');

    expect(image.src).toBe(NO_IMAGE_URL);
  });

  it('should display name', () => {
    render(<MovieDetails {...movie} />);

    expect(screen.getByText(movie.name)).toBeInTheDocument();
  });

  it('should display rating', () => {
    render(<MovieDetails {...movie} />);

    expect(screen.getByText(movie.rating)).toBeInTheDocument();
  });

  it('should display release year', () => {
    render(<MovieDetails {...movie} />);

    expect(screen.getByText(movie.releaseYear)).toBeInTheDocument();
  });

  it('should display duration in Xh Ymin format', () => {
    render(<MovieDetails {...movie} />);

    const expectedDuration = '3h 9min';
    expect(screen.getByText(expectedDuration)).toBeInTheDocument();
  });

  it('should display duration in Xmin format if it shorten then an hour', () => {
    render(<MovieDetails {...movie} duration={55} />);

    const expectedDuration = '55min';
    expect(screen.getByText(expectedDuration)).toBeInTheDocument();
  });

  it('should display description', () => {
    render(<MovieDetails {...movie} />);

    expect(screen.getByText(movie.description)).toBeInTheDocument();
  });
});