import React, { Component } from "react";
import "./Input.css";

export class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { label, name, ...rest } = this.props;

    return (
      <div className="input-container">
        <label htmlFor={name}>{label}</label>
        <input id={name} name={name} {...rest} />
      </div>
    );
  }
}

export default Input;
