import React from 'react';

import styled from 'styled-components';

import ChatContainer from '../containers/ChatContainer';
import AddMessage from '../containers/AddMessageContainer';

// const DetailImage = styled.img`
//   width: 100%;
// `;


export default function({chat}) {
  console.log(chat);
  return (
    <div>
      {chat.messages ? chat.messages.map((message, i) =>
          <div>
            {message.message}
          </div>
      ): null}
      <AddMessage projectId={chat.projectId} taskId={chat.taskId}/>
    </div>
  )
};
