import React, { Component } from "react";
import "./Button.css";

export class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { color, children, ...rest } = this.props;
    return (
      <button {...rest} className={`${color} button`}>
        {children}
      </button>
    );
  }
}

export default Button;
