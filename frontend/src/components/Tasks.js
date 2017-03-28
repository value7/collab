import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

const Box = styled.div`
  border: 1px solid #bbbbbb;
  border-radius: 4px;
  margin: 3%;
  width: 27%;
  display: inline-block;
  text-align: center;
  min-height: 80px;
  padding: 4px;
  ${props => props.state};
`;
const Image = styled.img`
  max-width: 35%;
  display: inline-block;
  float: right;
`;
const Title = styled.div`
  max-width: 64%;
  display: inline-block;
  margin-top: 25px;
  font-weight: 600;
`;

const LegendWrapper = styled.div`
  display: block;
`;

export default function({tasks, projectId}) {
  console.log(tasks);
  console.log(projectId);
  var stateColors = {
    "idea": {
      "background-color": "red",
      "color": "black"
    },
    "approved": {
      "background-color": "blue",
      "color": "black"
    },
    "done": {
      "background-color": "green",
      "color": "black"
    }
  }
  return (
    <div>
      <div>
        {Object.keys(tasks).map((key, i) => {
          return (
          <Link key={i} to={"/projects/" + projectId + "/tasks/" + tasks[key].id}>
            <Box state={stateColors[tasks[key].statename]}>
              <Title>{tasks[key].title}</Title>
              {tasks[key].imgurlink ? <Image src={tasks[key].imgurlink} /> : null}
            </Box>
          </Link>
        )
        })}
      </div>
      <LegendWrapper>
      Erklärung der Farben
      </LegendWrapper>
    </div>
  )
};
