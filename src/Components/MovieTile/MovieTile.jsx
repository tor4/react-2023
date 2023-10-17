import { useState } from 'react';
import PropTypes from 'prop-types';
import { NO_IMAGE_URL } from '../../Utils/constants';
import './MovieTile.css';

export function MovieTile({ movie, onSelect, onEdit, onDelete }) {
    const [menuOpened, setMenuOpened] = useState(false);

    const { imageUrl, name, releaseYear, genres } = movie

    const openMenu = (e) => {
        e.stopPropagation();
        setMenuOpened(true);
    };

    const closeMenu = (e) => {
        e.stopPropagation();
        setMenuOpened(false);
    }

    return (
        <article className='movie-tile' onClick={() => onSelect(movie)}>
            <div className={`context-menu ${menuOpened && 'opened'}`} onClick={openMenu}>
                <div className='menu'>
                    <button type="button" className='close' onClick={closeMenu}>x</button>
                    <button className='option' onClick={(e) => {
                        e.stopPropagation();
                        onEdit(name);
                    }}>Edit</button>
                    <button className='option' onClick={(e) => {
                        e.stopPropagation();
                        onDelete(name);
                    }}>Delete</button>
                </div>
            </div>
            <img src={imageUrl || NO_IMAGE_URL} alt={name} />
            <div className='details'>
                <div className='title'>
                    <h3>{name}</h3>
                    <span className='release-year'>{releaseYear}</span>
                </div>
                <p>{genres.join(', ')}</p>
            </div>
        </article>
    )
}

MovieTile.propTypes = {
    movie: PropTypes.shape({
        imageUrl: PropTypes.string,
        name: PropTypes.string.isRequired,
        releaseYear: PropTypes.number,
        genres: PropTypes.arrayOf(PropTypes.string),
    }),
    onSelect: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
}

MovieTile.defaultProps = {
    movie: {},
}