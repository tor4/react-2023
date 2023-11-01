import { Movie } from "./types";

export function formatDuration(minutes: number): string {
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

export function convertToMovieModel(movie: Movie): any {
  return {
    id: movie.id,
    name: movie.title,
    description: movie.overview,
    imageUrl: movie.poster_path,
    releaseYear: new Date(movie.release_date).getFullYear(),
    releaseDate: movie.release_date,
    duration: movie.runtime,
    rating: movie.vote_average,
    genres: movie.genres,
  };
}

export function convertToMovie(data: any, id: string | undefined): Movie {
  const object: Movie = {
    title: data.name,
    overview: data.description,
    poster_path: data.imageUrl,
    release_date: data.releaseDate,
    runtime: parseFloat(data.duration),
    vote_average: parseFloat(data.rating),
    genres: [data.genre],
  }

  if (id) {
    object.id = parseInt(id);
  }
  return object;
}

export async function getMovies(params: object, options: object) {
  let data = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null));
  const response = await fetch(`http://localhost:4000/movies?${new URLSearchParams(data).toString()}`, options);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Not found');
}

export async function getMovie(id: string) {
  const response = await fetch(`http://localhost:4000/movies/${id}`);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Not found');
}

export async function addMovie(data: Movie) {
  try {
    const response = await fetch('http://localhost:4000/movies', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function editMovie(data: Movie) {
  try {
    const response = await fetch('http://localhost:4000/movies', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (e) {
    throw new Error(e.message);
  }
}