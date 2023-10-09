import PropTypes from 'prop-types';
import { genres } from "utils/constants";
import './MovieForm.css';
import { Select } from '../Select/Select';

export function MovieForm({ movie, onSubmit }) {
  function onSubmitHandler(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    onSubmit(data);
  }

  return (<form onSubmit={onSubmitHandler} className='MovieForm'>
    <div className='control'>
      <label htmlFor="name">Title</label>
      <input type='text' id='name' name='name' placeholder='Movie Title' defaultValue={movie.name} />
    </div>
    <div className='control'>
      <label htmlFor="release-year">Release date</label>
      <input type='text' id='release-year' name='releaseYear' placeholder='2023' defaultValue={movie.releaseYear} />
    </div>
    <div className='control'>
      <label htmlFor="image-url">Movie url</label>
      <input type='text' id='image-url' name='imageUrl' placeholder='https://' defaultValue={movie.imageUrl} />
    </div>
    <div className='control'>
      <label htmlFor="rating">Rating</label>
      <input type='number' id='rating' name='rating' placeholder='7,8' step='0.1' defaultValue={movie.rating} />
    </div>
    <div className='control'>
      <label htmlFor="genre">Genre</label>
      <Select value={movie.genre} id='genre' name='genre' options={genres.map((genre) => ({ text: genre, value: genre }))} />
    </div>
    <div className='control'>
      <label htmlFor="duration">Runtime</label>
      <input type='number' id='duration' name='duration' placeholder='minutes' defaultValue={movie.duration} />
    </div>
    <div className='control-wide'>
      <label htmlFor="description">Overview</label>
      <textarea id='description' name='description' placeholder='Movie description' defaultValue={movie.description} />
    </div>
    <div className='buttons'>
      <button type='reset' className='secondary'>Reset</button>
      <button type='submit' className='primary'>Submit</button>
    </div>
  </form>)
};

MovieForm.propTypes = {
  movie: PropTypes.object,
  onSubmit: PropTypes.func,
};

MovieForm.defaultProps = {
  movie: {},
};