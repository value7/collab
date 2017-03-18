import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

import AddTask from '../containers/AddTaskContainer';

const Box = styled.div`
  border: 1px solid #bbbbbb;
  border-radius: 4px;
  margin: 3%;
  width: 27%;
  display: inline-block;
  text-align: center;
  min-height: 80px;
  padding: 4px;
  background-color: #eff3f7;
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

export default function({tasks, projectId}) {
  console.log(tasks);
  console.log(projectId);
  return (
    <div>
      {tasks ? tasks.map((task, i) =>
        <Link key={i} to={"/projects/" + projectId + "/tasks/" + task.id}>
          <Box>
            <Title>{task.title}</Title>
            {task.imgurlink ? <Image src={task.imgurlink} /> : null}
          </Box>
        </Link>
      ): null}
    </div>
  )
};
