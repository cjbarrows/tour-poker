import React, { Component } from 'react';

import { userService } from './services/userService';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: undefined,
      password: undefined,
      errorMessage: '',
    };
  }

  render() {
    const { errorMessage } = this.state;

    return (
      <div className="login">
        <div><input type="radio" id="p1" name="player" value="Charlie" onChange={(e) => this.handleOptionChange(e)}></input><label htmlFor="p1">Charlie</label></div>
        <div><input type="radio" id="p2" name="player" value="Ethan" onChange={(e) => this.handleOptionChange(e)}></input><label htmlFor="p2">Ethan</label></div>
        <div><input type="radio" id="p3" name="player" value="Jorie" onChange={(e) => this.handleOptionChange(e)}></input><label htmlFor="p3">Jorie</label></div>
        <div><input type="radio" id="p4" name="player" value="Katie" onChange={(e) => this.handleOptionChange(e)}></input><label htmlFor="p4">Katie</label></div>
        <input type="text" onChange={(e) => this.handlePasswordChange(e)} placeholder="password"></input>
        <button className="login" onClick={(e) => this.attemptLogin(e)}>Login</button>
        <div className="errorContainer">
          <p className="error">{errorMessage}</p>
        </div>
      </div >
    );
  }

  async attemptLogin() {
    const { username, password } = this.state;

    const result = await userService.login(username, password);
    if (result.ok) {
      this.props.history.push('/');
    } else {
      this.setState({ errorMessage: result.errorMessage });
    }
  }

  handleOptionChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
}

export default Login;