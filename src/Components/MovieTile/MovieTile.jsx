import PropTypes from 'prop-types';
import { NO_IMAGE_URL } from '../../Utils/constants';
import './MovieTile.css';
import { useState } from 'react';

export function MovieTile({ imageUrl, name, releaseYear, genres, onSelect, onEdit, onDelete }) {
    const [menuOpened, setMenuOpened] = useState(false);

    const openMenu = (e) => {
        e.stopPropagation();
        setMenuOpened(true);
    };

    const closeMenu = (e) => {
        e.stopPropagation();
        setMenuOpened(false);
    }

    return (
        <article className='movie-tile' onClick={() => onSelect(name)}>
            <div className={`context-menu ${menuOpened && 'opened'}`} onClick={openMenu}>
                <div className='menu'>
                    <span className='close' onClick={closeMenu}>x</span>
                    <span className='option' onClick={(e) => {
                        e.stopPropagation();
                        onEdit(name);
                    }}>Edit</span>
                    <span className='option' onClick={(e) => {
                        e.stopPropagation();
                        onDelete(name);
                    }}>Delete</span>
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
    imageUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
    releaseYear: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.string),
    onSelect: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
}

MovieTile.defaultProps = {
    genres: [],
}