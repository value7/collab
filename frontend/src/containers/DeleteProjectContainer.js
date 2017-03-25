import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestDeleteProject } from '../actions/projects'

import DeleteProject from '../components/DeleteProject';

//import styled from 'styled-components';

class DeleteProjectContainer extends Component {
  // static propTypes = {
  //   projects: PropTypes.object.isRequired,
  //   isFetching: PropTypes.bool.isRequired,
  //   lastUpdated: PropTypes.number,
  //   dispatch: PropTypes.func.isRequired
  // }

  deleteTask = (id) => {
    const { dispatch } = this.props;
    console.log(this.props);
    dispatch(requestDeleteProject(id));
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <DeleteProject projectId={this.props.params.projectId} deleteTask={this.deleteTask} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { projects } = state

  return {
    projects
  }
}

export default connect(mapStateToProps)(DeleteProjectContainer)
