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