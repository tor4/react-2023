import PropTypes from 'prop-types';
import './SortControl.css';
import { useState } from 'react';

export function SortControl({ selected, onChange }) {
  const defaultSelected = 'releaseDate';

  const [sortBy, setSortBy] = useState(selected || defaultSelected);

  const handleChange = (e) => {
    setSortBy(e.target.value);
    onChange(e.target.value);
  }

  return (
    <div className="sort-control">
      <label htmlFor="sort-by">Sort by</label>
      <span className='custom-select'>
        <select
          value={sortBy}
          onChange={handleChange}
          id="sort-by"
        >
          <option value="releaseDate">Release Date</option>
          <option value="title">Title</option>
        </select>
      </span>
    </div>
  )
};

SortControl.propTypes = {
  selected: PropTypes.string,
  onChange: PropTypes.func,
};