import PropTypes from 'prop-types';
import "./GenreSelect.css";


export function GenreSelect({ genres, selected, onSelect }) {
    const listItems = genres.map((genre, i) => (
        <li key={i}>
            <button
                className={`tab ${genre === selected ? "selected" : ""}`}
                onClick={() => onSelect(genre)}
            >
                {genre}
            </button>
        </li>
    ));
    return <ul className="GenreSelect">{listItems}</ul>;
}

GenreSelect.propTypes = {
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    selected: PropTypes.string,
    onSelect: PropTypes.func,
}