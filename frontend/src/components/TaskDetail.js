import React from 'react';

import styled from 'styled-components';

const Box = styled.div`
  border: 1px solid #bbbbbb;
  margin: 15px;
  width: 32%;
  display: inline-block;
`;

export default function({task, takeTask, user}) {
  console.log(task);
  var assigned = task.assignee ? task.assignee : 'not assigned';
  var image = task.imgurlink = <img src={task.imgurlink} />;
  var member = false;
  for(var i = 0; i < task.members.length; i++) {
    if(task.members[i] == user) {
      member = true;
    }
  }
  // console.log(task.members);
  // console.log(task.members.map((member, i) => {
  //   console.log(member);
  // }));
  return (<div>
            <Box>
              title: {task.title}
              creator: {task.creator}
              details: {task.description}
              {image}
              {assigned}
              members:
              {task.members.map((member, i) => {
                return (
                  <div key={i}>
                    {member}
                  </div>
                )
              })}
            </Box>
            {member ? null : <button onClick={takeTask}>take task</button>}
          </div>
  )
};
