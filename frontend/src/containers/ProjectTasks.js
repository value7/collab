import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchProjectDetailsOrAllIfNeeded, incrementState, addTask } from '../actions/projects'

import Tasks from '../components/Tasks';

import styled from 'styled-components';

const Updated = styled.p`
  margin: 0;
  font-size: 11px;
  text-align: right;
`;

class ProjectTasks extends Component {
  static propTypes = {
    projects: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props;
    console.log(this.props);
    console.log(this.props.params.projectId);
    dispatch(fetchProjectDetailsOrAllIfNeeded(this.props.params.projectId));
  }

  handleRefreshClick = e => {
    e.preventDefault();

    const { dispatch } = this.props;
    dispatch(fetchProjectDetailsOrAllIfNeeded(this.props.params.projectId));
  }

  handleIncrementStateClick = (id) => {
    const { dispatch } = this.props;
    dispatch(incrementState(id));
  }

  addTask = (id) => {
    const { dispatch } = this.props;
    dispatch(addTask(id));
  }

  render() {
    const { projects, lastUpdated, isFetching } = this.props;
    console.log(projects);
    console.log(this.props.params.projectId);
    console.log(projects.projects[this.props.params.projectId]);
    var items = projects.projects;
    const isEmpty = items.length === 0;
    return (
      <div>
        <Updated>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </Updated>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Tasks tasks={projects.projects[this.props.params.projectId].tasks} projectId={this.props.params.projectId}/>
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { projects } = state
  const {
    isFetching,
    lastUpdated
  } = projects || {
    isFetching: true
  }

  return {
    projects,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(ProjectTasks)
