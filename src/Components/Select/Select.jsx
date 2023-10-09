import PropTypes from 'prop-types';
import './Select.css';

export function Select({ id, name, value, options, onChange }) {
  return (
    <div className='custom-select'>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      >
        {
          options.map(({ text, value }) => (<option key={value} value={value}>{text}</option>))
        }
      </select>
    </div>
  )
}

Select.propTypes = {
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string,
  })),
}

Select.defaultProps = {
  options: [],
};