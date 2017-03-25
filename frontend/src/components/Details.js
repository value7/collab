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

const DetailsWrapper = styled.div`
  margin-bottom: 40px;
`;

const Divider = styled.div`
  background-color: black;
  height: 1px;
  width: 45%;
  margin: auto;
`;

const ChatHeader = styled.h2`
  text-align: center;
  margin-top: 35px;
`;

const StatsTable = styled.table`
  width: 60%;
  margin: auto;
  margin-top: 25px;
  margin-bottom: 25px;
`;

const StatsRow = styled.tr`
  line-height: 30px;
`;

export default function({project, incrementState, addTask}) {
  console.log(project);
  var hasImage = !!project.imgurlink;
  return (
    <DetailsWrapper>
      {
        hasImage ?
        <DetailImage src={project.imgurlink} /> :
        null
      }
      <DetailTitle>{project.title}</DetailTitle>
      <DetailDescription>{project.description}</DetailDescription>
      <Divider />
      <StatsTable>
        <tbody>
          <StatsRow>
            <td>Points</td>
            <td>{project.votes}</td>
          </StatsRow>
          <StatsRow>
            <td>Phase</td>
            <td>{project.phase}</td>
          </StatsRow>
          <StatsRow>
            <td>Members</td>
            <td>{project.creator} (Creator)</td>
          </StatsRow>
          {project.members.map((member, i) => {
            return <tr><td></td><td key={i}>{member}</td></tr>
          })}
        </tbody>
      </StatsTable>
      {/* TODO move to admin panel
        <button onClick={() => (incrementState(project.id))}>move to next state</button>*/}
      <Divider />
      <ChatHeader>Chat</ChatHeader>
      <ChatContainer projectId={project.id} taskId={0}/>
    </DetailsWrapper>
  )
};
