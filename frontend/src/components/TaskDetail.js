import React from 'react';

import styled from 'styled-components';

const Box = styled.div`
  border: 1px solid #bbbbbb;
  margin: 15px;
  width: 32%;
  display: inline-block;
`;

export default function({task}) {
  console.log(task);
  var assigned = task.assignee ? task.assignee : 'not assigned';
  var image = task.imgurlink = <img src={task.imgurlink} />;

  return (
    <Box>
      title: {task.title}
      creator: {task.creator}
      details: {task.description}
      {image}
      {assigned}
    </Box>
  )
};
