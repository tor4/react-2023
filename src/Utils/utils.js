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

export async function getMovies(params, options) {
  const response = await fetch(`http://localhost:4000/movies?${new URLSearchParams(params).toString()}`, options);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Not found');
}