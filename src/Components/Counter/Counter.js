import React, { createElement } from 'react';
import PropTypes from 'prop-types';

export class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: props.count };
  }

  decrease() {
    let count = this.state.count;
    this.setState({ count: --count });
  }

  increase() {
    let count = this.state.count;
    this.setState({ count: ++count });
  }

  render() {
    return createElement(
      'div',
      { className: 'counter' },
      createElement(
        'button',
        {
          className: 'primary',
          'data-cy': 'decrement',
          onClick: this.decrease.bind(this)
        },
        '-'
      ),
      createElement('span', null, this.state.count),
      createElement(
        'button',
        {
          className: 'primary',
          'data-cy': 'increment',
          onClick: this.increase.bind(this)
        },
        '+'
      )
    );
  }
}

Counter.propTypes = {
  count: PropTypes.number,
};

Counter.defaultProps = {
  count: 0,
};