export type Movie = {
  id?: number | undefined,
  title: string,
  overview: string,
  poster_path: string,
  release_date: string,
  runtime: number,
  vote_average: number,
  genres: string[],
}

export type Response<T> = {
  data: T
};