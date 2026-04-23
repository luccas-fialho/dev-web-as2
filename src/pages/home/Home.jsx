import React, { Component } from "react";
import "./Home.css";
import firebase from "../../Firebase.js";
import formatDate from "../../util/formatedDate.js";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      lastName: "",
      birthday: "",
      loading: true,
    };
  }

  async componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        console.log("Usuário não logado");

        this.setState({ loading: false });
        return;
      }

      try {
        const doc = await firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get();

        if (doc.exists) {
          this.setState({
            ...doc.data(),
            loading: false,
          });
        } else {
          console.log("Documento não encontrado");

          this.setState({ loading: false });
        }
      } catch (error) {
        console.error(error);
        this.setState({ loading: false });
      }
    });
  }

  render() {
    const { name, lastName, birthday, loading } = this.state;

    if (loading) {
      return <p>Loading personal data...</p>;
    }

    return (
      <div className="home-container">
        <h1>Personal Info from db</h1>
        <p>
          <span>Name: </span>
          {name}
        </p>
        <p>
          <span>Last Name: </span> {lastName}
        </p>
        <p>
          <span>Birthday: </span> {formatDate(birthday)}
        </p>
      </div>
    );
  }
}

export default Home;
