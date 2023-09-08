import React, { createElement } from "react";

export class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: props.count || 0 };
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
      "div",
      {},
      createElement(
        "button",
        {
          className: "btn",
          'data-cy': 'decrement',
          onClick: this.decrease.bind(this)
        },
        "-"
      ),
      createElement("span", null, this.state.count),
      createElement(
        "button",
        {
          className: "btn",
          'data-cy': 'increment',
          onClick: this.increase.bind(this)
        },
        "+"
      )
    );
  }
}
