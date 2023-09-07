import "./GenreSelect.css";

export function GenreSelect({ genres, selected, onSelect }) {
    const listItems = genres.map((genre) => (
        <li>
        <button
            className={`btn tab ${genre === selected ? "selected" : ""}`}
            onClick={() => onSelect(genre)}
        >
            {genre}
        </button>
        </li>
    ));
    return <ul className="GenreSelect">{listItems}</ul>;
}
  