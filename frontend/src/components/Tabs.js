import React, { Component } from 'react';
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
          <Tab><NavItem to={"/projects/" + this.props.params.projectId + "/overview"}>Overview</NavItem></Tab>
          {' '}
          <Tab><NavItem to={"/projects/" + this.props.params.projectId + "/tasks"}>Tasks</NavItem></Tab>
          {' '}
          <Tab><NavItem to={"/projects/" + this.props.params.projectId + "/addTask"}>Add Task</NavItem></Tab>
          {' '}
          {owner ? (<AdminLinks>
          {' '}
          <Tab><NavItem to={"/projects/" + this.props.params.projectId + "/editdeleteProject"}>Admin Stuff</NavItem></Tab>
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
