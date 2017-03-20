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

const AdminLinks = styled.div`
  display: inline-block;
`;

class Tabs extends Component {
  componentDidMount() {
    console.log(this);
  }

  render() {
    var owner
    if(this.props.projects && this.props.projects.projects && this.props.projects.projects[this.props.params.projectId]) {
      owner = this.props.projects.projects[this.props.params.projectId].creator === this.props.user.user;
    }
    console.log(owner);
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
          {owner ? (<AdminLinks>
          <Tab><NavItem to={this.props.location.pathname.slice(0, this.props.location.pathname.lastIndexOf('/')) + "/editProject"}>Edit Project</NavItem></Tab>
          <Tab><NavItem to={this.props.location.pathname.slice(0, this.props.location.pathname.lastIndexOf('/')) + "/deleteProject"}>Delete Project</NavItem></Tab>
          </AdminLinks>): null}
        </TabLine>
        <div>{this.props.children}</div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    projects: state.projects
  };
}

export default connect(mapStateToProps)(Tabs)
