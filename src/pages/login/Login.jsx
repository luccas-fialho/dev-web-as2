import React, { Component } from "react";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import firebase from "../../Firebase.js";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
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
      this.setState({ error: "Preencha todos os campos" });
      return;
    }

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      this.setState({
        error: "User not found or wrong password",
      });
    }
  }

  render() {
    return (
      <div className="container">
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

        {this.state.error && <p style={{ color: "red" }}>{this.state.error}</p>}

        <Button color="primary" onClick={this.handleLogin}>
          Login
        </Button>
      </div>
    );
  }
}

export default Login;
