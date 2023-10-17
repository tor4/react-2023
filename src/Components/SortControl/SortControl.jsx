import PropTypes from 'prop-types';
import './SortControl.css';
import { Select } from '../Select/Select';

const sortByOptions = [
  { text: 'Release Date', value: 'release_date' },
  { text: 'Title', value: 'title' },
];

export function SortControl({ selected, onChange }) {
  return (
    <div className="sort-control">
      <label htmlFor="sort-by">Sort by</label>
      <Select id={'sort-by'} name={'sortBy'} value={selected} onChange={onChange} options={sortByOptions} />
    </div>
  )
};

SortControl.propTypes = {
  selected: PropTypes.string,
  onChange: PropTypes.func,
};

SortControl.defaultProps = {
  selected: 'releaseDate',
};