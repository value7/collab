import React from 'react';

import styled from 'styled-components';

import ChatContainer from '../containers/ChatContainer';
import AddMessage from '../containers/AddMessageContainer';

const Message = styled.div`
  border: 1px solid black;
  margin: 5px 20px;
  border-radius: 2px;
`;

const UserName = styled.div`
  font-size: 10px;
`;

const Text = styled.div`
  background-color: #f4f4f4;
  padding: 2px;
`;

export default function({chat}) {
  console.log(chat);
  return (
    <div>
      {chat.messages ? chat.messages.map((message, i) =>
          <Message key={i}>
            <UserName>{message.username}</UserName>
            <Text>{message.message}</Text>
          </Message>
      ): null}
      <AddMessage projectId={chat.projectId} taskId={chat.taskId}/>
    </div>
  )
};
