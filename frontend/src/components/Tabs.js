import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';

class Tabs extends Component {
  componentDidMount() {
    console.log(this);
  }
  
  render() {
    return (
      <div>
        {' '}
        <div><Link to={this.props.location.pathname.slice(0, this.props.location.pathname.lastIndexOf('/')) + "/overview"}>Overview</Link></div>
        {' '}
        <div><Link to={this.props.location.pathname.slice(0, this.props.location.pathname.lastIndexOf('/')) + "/tasks"}>Tasks</Link></div>
        {' '}
        <div>{this.props.children}</div>
      </div>
    )
  }
}

export default connect()(Tabs)
