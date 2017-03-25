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
    const { tasks, user } = this.props;
    console.log(user);
    var task = tasks.tasks[this.props.params.taskId];
    console.log(task);
    var isEmpty = !task;
    return (
      <div>
        {/*}<Updated>
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
        </Updated>*/}
        {isEmpty
          ? (false ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: false ? 0.5 : 1 }}>
            <TaskDetail task={task} takeTask={this.handleTakeTaskClick} user={user.user}/>
            <ChatContainer projectId={this.props.params.projectId} taskId={this.props.params.taskId}/>
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { tasks, user } = state

  return {
    tasks,
    user
  }
}

export default connect(mapStateToProps)(TaskDetails)
