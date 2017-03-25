import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchChatIfNeeded } from '../actions/chats'

import Chat from '../components/Chat';

import styled from 'styled-components';

const Updated = styled.p`
  margin: 0;
  font-size: 11px;
  text-align: right;
`;

const Margin = styled.div`
  margin-top: 25px;
`;

class ChatContainer extends Component {
  // static propTypes = {
  //   chat: PropTypes.object.isRequired,
  //   dispatch: PropTypes.func.isRequired
  // }

  componentDidMount() {
    const { dispatch } = this.props;
    console.log(this.props);
    dispatch(fetchChatIfNeeded(this.props.projectId, this.props.taskId));
  }

  // handleRefreshClick = e => {
  //   e.preventDefault();
  //
  //   const { dispatch } = this.props;
  //   dispatch(fetchProjectDetailsOrAllIfNeeded(this.props.params.projectId));
  // }

  // addTask = (id) => {
  //   const { dispatch } = this.props;
  //   dispatch(addTask(id));
  // }

  render() {
    const { chats, projectId, taskId } = this.props;
    console.log(projectId, taskId, chats);
    var lastUpdated, isFetching = true, isEmpty;
    if(chats.length > 0) {
      var chat = chats.filter((chat) => chat.taskId === taskId && chat.projectId === projectId)[0];
      console.log(chat);
      if(chat) {
        isEmpty = false
        isFetching = chat.isFetching || false;
        lastUpdated = chat.lastUpdated || null;
      } else {
        isEmpty = true;
        isFetching = false;
        lastUpdated = null;
      }
    } else {
      isEmpty = true;
      isFetching = false;
      lastUpdated = null;
    }
    return (
      <Margin>
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
            <Chat chat={chat} />
            </div>
        }
      </Margin>
    )
  }
}

const mapStateToProps = state => {
  const { chats } = state || {};

  return {
    chats
  }
}

export default connect(mapStateToProps)(ChatContainer)
