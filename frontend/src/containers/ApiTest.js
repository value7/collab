import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchMessageIfNeeded, invalidateMessage } from '../actions'

class ApiTest extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchMessageIfNeeded())
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(invalidateMessage())
    dispatch(fetchMessageIfNeeded())
  }

  render() {
    const { message, lastUpdated, isFetching } = this.props;
    console.log(message);
    const isEmpty = typeof message.text === "undefined";
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
              {message.text}
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { message } = state
  const {
    isFetching,
    lastUpdated
  } = message || {
    isFetching: true
  }

  return {
    message,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(ApiTest)
