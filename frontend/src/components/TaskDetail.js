import React from 'react';

import styled from 'styled-components';

// const Box = styled.div`
//   border: 1px solid #bbbbbb;
//   margin: 15px;
//   width: 32%;
//   display: inline-block;
// `;

const Title = styled.div`
  font-size: 16px;
`;
const Description = styled.div`
  font-size: 12px;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
`;

const Creator = styled.div`
  font-size: 12px;
  background-color: #f3f3f3;
`;

export default function({task, takeTask, user}) {
  console.log(task);
  var assigned = task.assignee ? task.assignee : 'not assigned';
  var image = task.imgurlink = <Image src={task.imgurlink} />;
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
              <Title>title: {task.title}</Title>
              <Creator>creator: {task.creator}</Creator>
              <Description>details: {task.description}</Description>
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
            {member ? null : <button onClick={takeTask}>take task</button>}
          </div>
  )
};
