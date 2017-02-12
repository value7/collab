import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchSecuredMessageIfNeeded, invalidateSecuredMessage } from '../actions'

class SecuredApiTest extends Component {
  static propTypes = {
    securedMessage: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchSecuredMessageIfNeeded())
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(invalidateSecuredMessage())
    dispatch(fetchSecuredMessageIfNeeded())
  }

  render() {
    const { securedMessage, lastUpdated, isFetching } = this.props;
    console.log(securedMessage);
    const isEmpty = typeof securedMessage.text === "undefined";
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
              {securedMessage.text}
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { securedMessage } = state
  const {
    isFetching,
    lastUpdated
  } = securedMessage || {
    isFetching: true
  }

  return {
    securedMessage,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(SecuredApiTest)
