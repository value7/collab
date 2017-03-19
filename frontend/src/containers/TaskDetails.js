import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchProjectDetailsOrAllIfNeeded, incrementState, addTask, requestTakeTask } from '../actions/projects';

import TaskDetail from '../components/TaskDetail';
import ChatContainer from './ChatContainer';

import styled from 'styled-components';

const Updated = styled.p`
  margin: 0;
  font-size: 11px;
  text-align: right;
`;

class TaskDetails extends Component {
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

  handleTakeTaskClick = () => {
    const { dispatch, params } = this.props;
    dispatch(requestTakeTask(params.taskId));
  }

  addTask = (id) => {
    const { dispatch } = this.props;
    dispatch(addTask(id));
  }

  render() {
    const { projects, user, lastUpdated, isFetching } = this.props;
    console.log(user);
    var items = projects.projects;
    const isEmpty = items.length === 0;
    var task;
    if(!isEmpty) {
      if(this.props.params.taskId) {
        var index = projects.projects[this.props.params.projectId].tasks.findIndex(task =>
          task.id==this.props.params.taskId
        );
        task = projects.projects[this.props.params.projectId].tasks[index];
      }
    }
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
            <TaskDetail task={task} takeTask={this.handleTakeTaskClick} user={user.user}/>
            <ChatContainer projectId={this.props.params.projectId} taskId={this.props.params.taskId}/>
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { projects, user } = state
  const {
    isFetching,
    lastUpdated
  } = projects || {
    isFetching: true
  }

  return {
    projects,
    user,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(TaskDetails)
