import React, { Component } from "react";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import firebase from "../../Firebase.js";
import "./Login.css";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
      success: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleLogin() {
    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: "Fill all the fields!" });
      return;
    }

    this.setState({
      error: "",
      success: "",
    });

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      this.setState({ success: "Login successful!" });
      setTimeout(() => {
        window.location.href = "/home";
      }, 3000);
    } catch (error) {
      this.setState({
        error: "User not found or wrong password. Try again.",
        success: "",
      });
    }
  }

  render() {
    return (
      <div className="login-container">
        <h1>Login</h1>

        <Input
          label="Email"
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />

        <Button color="primary" onClick={this.handleLogin}>
          Login
        </Button>

        <p>
          Don't have a register yet? <a href="/">Click here.</a>{" "}
        </p>

        {this.state.error && <p style={{ color: "red" }}>{this.state.error}</p>}
        {this.state.success && (
          <p style={{ color: "green" }}>{this.state.success}</p>
        )}
      </div>
    );
  }
}

export default Login;
