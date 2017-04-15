import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

import GantChart from './GantChart';

const Box = styled.div`
  border: 1px solid #bbbbbb;
  border-radius: 4px;
  margin: 3%;
  width: 27%;
  display: inline-block;
  text-align: center;
  min-height: 80px;
  ${props => props.state};
`;
const Image = styled.img`
  max-width: 35%;
  display: inline-block;
  float: right;
`;
const Title = styled.div`
  margin-top: 25px;
  font-weight: 600;
  font-size: 0.9em;
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
`;

const LegendWrapper = styled.div`
  display: block;
  text-align: center;
  font-height: 18px;
`;

const LegendBlock = styled.div`
  width: 100px;
`;

const Idea = styled.div`
  background-color: #eca7a7;
  border-radius: 4px;
  margin: 4px;
`;
const Approved = styled.div`
  background-color: #7f7fce;
  border-radius: 4px;
  margin: 4px;
`;

const Done = styled.div`
  background-color: #86d886;
  border-radius: 4px;
  margin: 4px;
`;

//boxen
/*
{Object.keys(tasks).map((key, i) => {
  return (
  <div>
  <Link key={i} to={"/projects/" + projectId + "/tasks/" + tasks[key].id}>
    <Box state={stateColors[tasks[key].statename]} >
      <Title>{tasks[key].title}</Title>
    </Box>
  </Link>
  </div>
  <LegendWrapper>
    <Idea>Idea <LegendBlock /></Idea>
    <Approved>Approved <LegendBlock /></Approved>
    <Done>Done <LegendBlock /></Done>
  </LegendWrapper>
)
})}

*/

export default function({tasks, projectId}) {
  console.log(tasks);
  console.log(projectId);
  var stateColors = {
    "idea": {
      "background-color": "#eca7a7",
      "color": "black"
    },
    "approved": {
      "background-color": "#7f7fce",
      "color": "black"
    },
    "done": {
      "background-color": "#86d886",
      "color": "black"
    }
  }
  let begin = new Date('2017-02-01');
  let finish = new Date('2017-07-01');
  console.log(begin, finish);
  let empty = Object.keys(tasks).length > 0;
  return (
    <div>
      <div>
      {empty ? <GantChart begin={begin} finish={finish} tasks={tasks}/> : null}

      </div>

    </div>
  )
};
