import React, { Component } from "react";
import "./Home.css";
import firebase from "../../Firebase.js";

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
      return <p>Carregando...</p>;
    }

    return (
      <div>
        <h1>Personal Info from db</h1>
        <p>Name: {name}</p>
        <p>Last Name: {lastName}</p>
        <p>Birthday: {birthday}</p>
      </div>
    );
  }
}

export default Home;
