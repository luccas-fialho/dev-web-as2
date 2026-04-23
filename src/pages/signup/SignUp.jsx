import React, { Component } from "react";
import "./SignUp.css";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import firebase from "../../Firebase.js";

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      lastName: "",
      birthday: "",
      loading: false,
      error: "",
      success: "",
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleLogin() {
    const { email, password, name, lastName, birthday } = this.state;

    this.setState({
      loading: true,
      error: "",
      success: "",
    });

    if (!email || !password) {
      this.setState({ loading: false });
      error: "Must have email and password";
      return;
    }

    this.setState({ loading: true });

    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      const uid = userCredential.user.uid;

      await firebase.firestore().collection("users").doc(uid).set({
        email,
        name,
        lastName,
        birthday,
      });

      this.setState({
        success: "User created successfully!",
        email: "",
        password: "",
        name: "",
        lastName: "",
        birthday: "",
      });

      setTimeout(() => {
        this.setState({ success: "" });
      }, 3000);
    } catch (error) {
      let message = "Error creating user";

      if (error.code === "auth/email-already-in-use") {
        message = "Email already in use";
      }

      this.setState({ error: message });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">Sign Up</h1>
        <div>
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="email@email.com"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="***********"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Input
            label="Name"
            type="text"
            name="name"
            placeholder="Your Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
          <Input
            label="Birthday"
            type="date"
            name="birthday"
            value={this.state.birthday}
            onChange={this.handleChange}
          />

          <Button color="primary" onClick={this.handleLogin}>
            {this.state.loading ? "Loading..." : "Send"}
          </Button>

          {this.state.error && (
            <p style={{ color: "red" }}>{this.state.error}</p>
          )}

          {this.state.success && (
            <p style={{ color: "green" }}>{this.state.success}</p>
          )}
        </div>
      </div>
    );
  }
}

export default SignUp;
