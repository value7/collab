import React from 'react';

import styled from 'styled-components';

import ChatContainer from '../containers/ChatContainer';

const DetailImage = styled.img`
  width: 100%;
`;

const DetailTitle = styled.h1`
  font-weight: 600;
  text-align: center;
  margin: 45px;
`;

const DetailDescription = styled.h3`
  text-align: center;
  color: #5a5a5a;
`;

export default function({project, incrementState, addTask}) {
  console.log(project);
  var hasImage = !!project.imgurlink;
  return (
    <div>
      {
        hasImage ?
        <DetailImage src={project.imgurlink} /> :
        null
      }
      <DetailTitle>{project.title}</DetailTitle>
      <DetailDescription>{project.description}</DetailDescription>
      <div>{project.votes}</div>
      <div>{project.phase}</div>
      <button onClick={() => (incrementState(project.id))}>move to next state</button>
      <ChatContainer projectId={project.id} taskId={0}/>
    </div>
  )
};
