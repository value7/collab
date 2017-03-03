import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchProjectsIfNeeded, invalidateProjects, upvoteProject, cancelUpVote } from '../actions/projects'

import ProjectList from '../components/ProjectList';

class Projects extends Component {
  static propTypes = {
    projects: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchProjectsIfNeeded())
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(invalidateProjects())
    dispatch(fetchProjectsIfNeeded())
  }

  handleUpVoteClick = (id) => {
    console.log(id);
    const { dispatch } = this.props;
    dispatch(upvoteProject(id));
  }

  handleCancelUpVoteClick = (id) => {
    const { dispatch } = this.props;
    dispatch(cancelUpVote(id));
  }

  render() {
    const { projects, lastUpdated, isFetching, user } = this.props;
    console.log(projects);
    console.log(user.votes);
    var items = projects.projects;
    const isEmpty = items.length === 0;
    return (
      <div>
        <p>
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
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <ProjectList projects={items} upvoted={user.votes} cancelUpVote={this.handleCancelUpVoteClick} upVote={this.handleUpVoteClick}/>
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

export default connect(mapStateToProps)(Projects)
