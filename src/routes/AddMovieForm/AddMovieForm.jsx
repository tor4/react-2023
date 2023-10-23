import { redirect, useLocation, useNavigate, useSubmit } from "react-router-dom";
import { Dialog } from "../../Components/Dialog/Dialog";
import { MovieForm } from "../../Components/MovieForm/MovieForm";
import { addMovie, convertToMovie } from "../../Utils/utils";

export async function addMovieAction({ request }) {
  const formData = Object.fromEntries(await request.formData());
  const object = convertToMovie(formData);
  const movie = await addMovie(object);

  const url = new URL(request.url);

  return redirect(`/movies/${movie.id}${url.search}`);
}

export function AddMovieForm() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const submit = useSubmit();

  function onSubmit(data, e) {
    submit(e.target, { data, method: 'post', action: `/new${search}` });
  }

  return (
    <Dialog title='Add movie' onClose={() => navigate(`/${search}`)}>
      <MovieForm onSubmit={onSubmit} />
    </Dialog>
  );
}