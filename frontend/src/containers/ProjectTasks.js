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
    console.log(this.props);
    const { tasks } = this.props;
    console.log(tasks);

    var items = {};
    var keys = Object.keys(tasks.tasks);
    for(var i = 0; i < keys.length; i++) {
      if(tasks.tasks[keys[i]].projectid === parseInt(this.props.params.projectId, 10)) {
        items[keys[i]] = tasks.tasks[keys[i]];
      }
    }

    console.log(items);
    const isEmpty = items.length === 0;
    return (
      <div>
        <Updated>
          {!tasks.loading &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </Updated>
        {isEmpty
          ? (tasks.loading ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: tasks.loading ? 0.5 : 1 }}>
            <Tasks tasks={items} projectId={this.props.params.projectId}/>
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { tasks } = state

  return {
    tasks
  }
}

export default connect(mapStateToProps)(ProjectTasks)
