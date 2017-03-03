import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchProjectDetails } from '../actions/projects'

import Details from '../components/Details';

class ProjectDetails extends Component {
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
    dispatch(fetchProjectDetails(this.props.params.projectId));
  }

  handleRefreshClick = e => {
    e.preventDefault();

    const { dispatch } = this.props;
    dispatch(fetchProjectDetails(this.props.params.projectId));
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
            <Details project={projects.projects[this.props.params.projectId]} />
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

export default connect(mapStateToProps)(ProjectDetails)
