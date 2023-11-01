import PropTypes from 'prop-types';
import { NO_IMAGE_URL } from '@utils/constants';
import { formatDuration } from '@utils/utils';
import './MovieDetails.css';

export function MovieDetails({ imageUrl, name, genres, releaseYear,
  rating, duration, description }) {
  return (
    <article className='movie-details'>
      <figure className='poster'>
        <img src={imageUrl || NO_IMAGE_URL} alt={name} />
      </figure>
      <div className='details'>
        <h2>
          <span className='title'>{name}</span>
          <span className='rating'>{rating}</span>
        </h2>
        <p className='genres'>{genres.join(', ')}</p>
        <div className='info'>
          <span className='info-item'>{releaseYear}</span>
          <span className='info-item'>{formatDuration(duration)}</span>
        </div>
        <p className='description'>{description}</p>
      </div>
    </article>
  )
}

MovieDetails.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  releaseYear: PropTypes.number,
  genres: PropTypes.arrayOf(PropTypes.string),
  rating: PropTypes.number,
  duration: PropTypes.number,
  description: PropTypes.string,
};

MovieDetails.defaultProps = {
  genres: [],
}