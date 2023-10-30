import PropTypes from 'prop-types';
import "./GenreSelect.css";
import { Link, useSearchParams } from '@remix-run/react';
import { SEARCH_PARAMS } from '../../Utils/constants';

const getSearchParams = (searchParams, genre) => {
    const filter = genre === 'All' ? null : genre;
    if (filter === null) {
        searchParams.delete(SEARCH_PARAMS.GENRE);
    } else {
        searchParams.set(SEARCH_PARAMS.GENRE, filter);
    }
    return searchParams;
}

export function GenreSelect({ genres, selected, onSelect }) {
    const [searchParams] = useSearchParams();

    const all = <li key='all'>
        <Link
            to={`/?${getSearchParams(searchParams, 'All').toString()}`}
            className={`btn tab ${selected === null ? "selected" : ""}`}
            onClick={() => onSelect(null)}
        >
            All
        </Link>
    </li>

    const items = genres.map((genre, i) => (
        <li key={i}>
            <Link
                to={`/?${getSearchParams(searchParams, genre).toString()}`}
                className={`btn tab ${genre === selected ? "selected" : ""}`}
                onClick={() => onSelect(genre)}
            >
                {genre}
            </Link>
        </li>
    ));


    return <ul className="GenreSelect">{[all, ...items]}</ul>;
}

GenreSelect.propTypes = {
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    selected: PropTypes.string,
    onSelect: PropTypes.func,
}