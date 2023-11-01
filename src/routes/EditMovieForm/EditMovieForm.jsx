import { redirect, useLoaderData, useLocation, useNavigate, useSubmit } from "react-router-dom";
import { Dialog, MovieForm } from '@components';
import { convertToMovie, editMovie } from "@utils/utils";

export async function action({ request, params }) {
  const formData = Object.fromEntries(await request.formData());
  const object = convertToMovie(formData, params.movieId);
  const movie = await editMovie(object);

  const url = new URL(request.url);

  return redirect(`/movies/${movie.id}${url.search}`);
}

export function EditMovieForm() {
  const movie = useLoaderData();
  const { search } = useLocation();
  const navigate = useNavigate();
  const submit = useSubmit();

  function onSubmit(data, e) {
    submit(e.target, { data, method: 'put', action: `/movies/${movie.id}/edit${search}` });
  }

  return (
    <Dialog title='Edit movie' onClose={() => navigate(`/${search}`)}>
      <MovieForm movie={movie} onSubmit={onSubmit} />
    </Dialog>
  );
}