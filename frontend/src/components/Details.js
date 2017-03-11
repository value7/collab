import React from 'react';
import Tasks from './Tasks';

import styled from 'styled-components';

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

export default function({project, incrementState}) {
  console.log(project);
  var hasImage = !!project.imgurlink;
  return (
    <div>
      {
        hasImage ?
        <DetailImage src={project.imgurlink} /> :
        <p> sadly there is no image for this project </p>
      }
      <DetailTitle>{project.title}</DetailTitle>
      <DetailDescription>{project.description}</DetailDescription>
      <div>{project.votes}</div>
      <div>{project.phase}</div>
      <button onClick={() => (incrementState(project.id))}>move to next state</button>
      <Tasks tasks={project.tasks} />
    </div>
  )
};
