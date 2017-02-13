import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions'

class ApiTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      username: '',
      password: ''
    })
  }

  handleUsernameChange(e) {
    console.log(e.target.value);
    this.setState({
      username: e.target.value
    })
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    console.log('submitting');
    dispatch(loginUser(this.state.username, this.state.password));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleUsernameChange} value={this.state.username} name="username" autoComplete="off" type="text" label="Username"/>
        <input onChange={this.handlePasswordChange} value={this.state.password} name="password" autoComplete="off" type="password" label="Password"/>
        <div>
          <button type="submit">Log In</button>
        </div>
      </form>
    )
  }
}

export default connect()(ApiTest)
