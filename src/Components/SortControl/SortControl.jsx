import { useState } from 'react';
import PropTypes from 'prop-types';
import './SortControl.css';
import { Select } from '../Select/Select';

const sortByOptions = [
  { text: 'Release Date', value: 'releaseYear' },
  { text: 'Title', value: 'name' },
];

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
      <Select value={sortBy} onChange={handleChange} options={sortByOptions} />
    </div>
  )
};

SortControl.propTypes = {
  selected: PropTypes.string,
  onChange: PropTypes.func,
};