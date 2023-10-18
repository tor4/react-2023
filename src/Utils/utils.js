export function formatDuration(minutes) {
  if (!minutes) {
    return;
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins}min`;
  }
  return `${hours}h ${mins}min`;
}

export function convertToMovieModel(movie) {
  return {
    id: movie.id,
    name: movie.title,
    description: movie.overview,
    imageUrl: movie.poster_path,
    releaseYear: new Date(movie.release_date).getFullYear(),
    duration: movie.runtime,
    rating: movie.vote_average,
    genres: movie.genres,
  };
}

export async function getMovies(params, options) {
  let data = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null));
  const response = await fetch(`http://localhost:4000/movies?${new URLSearchParams(data).toString()}`, options);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Not found');
}

export async function getMovie(id) {
  const response = await fetch(`http://localhost:4000/movies/${id}`);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Not found');
}