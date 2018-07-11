import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-responsive-modal";
import { withRouter } from "react-router";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { Container, Row, Col, Input, Button } from "mdbreact";
import "./Modal.css";

import API from "../../utils/API";

export default class ModalComponent extends React.Component {
  state = {
    open: false,
    submitted: false,
    username: "",
    password: ""
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };
  handleJoinSubmit = event => {
    event.preventDefault();
    API.login({
      username: this.state.username,
      password: this.state.password
    }).then(res => {
      console.log("login succcessful", res.data);
      if (res.status === 200) {
        this.setState({ submitted: true });
      }

      //this.props.history.push('/profile/', {username: this.state.username})
      //need to use react router to change the route in the app
      // /profile/res.data.id
    });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    let redirect = null;
    if (this.state.submitted) {
      redirect = <Redirect to="/profile/3" />;
    }

    return (
      <div>
        <button id="joinUs" className="btn hvr-grow" onClick={this.onOpenModal}>
          JOIN US
        </button>
        {redirect}
        <Modal open={open} onClose={this.onCloseModal} center>
          <form className="form">
            <input
              className="usernameInput"
              id="username"
              value={this.state.username}
              name="username"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Username"
            />
            <br />
            <input
              className="passwordInput"
              id="password"
              value={this.state.password}
              name="password"
              onChange={this.handleInputChange}
              type="password"
              placeholder="Password"
            />
            <br />
            <button
              className="submitButton hvr-grow"
              onClick={this.handleJoinSubmit}
            >
              Submit
            </button>
            <h1>
              Don't have an account yet?{" "}
              <a href="/signup" target="blank">
                Sign Up
              </a>
            </h1>
          </form>
        </Modal>
      </div>
    );
  }
}

// ReactDOM.render(<ModalCompgonent />, document.getElementById("app"));
