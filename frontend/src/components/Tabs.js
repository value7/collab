import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';
import NavItem from './NavItem';

const Tab = styled.div`
  display: inline-block;
  padding: 3px;
`;

const TabLine = styled.div`
  border-bottom: 1px solid black;
  background-color: white;
`;

class Tabs extends Component {
  componentDidMount() {
    console.log(this);
  }

  render() {
    return (
      <div>
        <TabLine>
          {' '}
          <Tab><NavItem to={this.props.location.pathname.slice(0, this.props.location.pathname.lastIndexOf('/')) + "/overview"}>Overview</NavItem></Tab>
          {' '}
          <Tab><NavItem to={this.props.location.pathname.slice(0, this.props.location.pathname.lastIndexOf('/')) + "/tasks"}>Tasks</NavItem></Tab>
          {' '}
          <Tab><NavItem to={this.props.location.pathname.slice(0, this.props.location.pathname.lastIndexOf('/')) + "/addTask"}>Add Task</NavItem></Tab>
          {' '}
          <Tab><NavItem to={this.props.location.pathname.slice(0, this.props.location.pathname.lastIndexOf('/')) + "/editProject"}>Edit Project</NavItem></Tab>
          {' '}
          <Tab><NavItem to={this.props.location.pathname.slice(0, this.props.location.pathname.lastIndexOf('/')) + "/deleteProject"}>Delete Project</NavItem></Tab>
          {' '}
        </TabLine>
        <div>{this.props.children}</div>
      </div>
    )
  }
}

export default connect()(Tabs)
