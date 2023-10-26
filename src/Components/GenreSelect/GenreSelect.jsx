import PropTypes from 'prop-types';
import "./GenreSelect.css";


export function GenreSelect({ genres, selected, onSelect }) {
    const all = <li key='all'>
        <button
            className={`tab ${selected === null ? "selected" : ""}`}
            onClick={() => onSelect(null)}
        >
            All
        </button>
    </li>

    const items = genres.map((genre, i) => (
        <li key={i}>
            <button
                className={`tab ${genre === selected ? "selected" : ""}`}
                onClick={() => onSelect(genre)}
            >
                {genre}
            </button>
        </li>
    ));


    return <ul className="GenreSelect">{[all, ...items]}</ul>;
}

GenreSelect.propTypes = {
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    selected: PropTypes.string,
    onSelect: PropTypes.func,
}