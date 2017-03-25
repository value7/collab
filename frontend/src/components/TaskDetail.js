import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

// const Box = styled.div`
//   border: 1px solid #bbbbbb;
//   margin: 15px;
//   width: 32%;
//   display: inline-block;
// `;

const Title = styled.div`
  font-size: 36px;
  text-align: center;
  margin: 35px 0px;
`;
const Description = styled.div`
  font-size: 12px;
  text-align: center;
  margin: 25px 0;
`;

const Image = styled.img`
  width: 100%;
`;

const Creator = styled.div`
  font-size: 12px;
  background-color: #f3f3f3;
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

const Divider = styled.div`
  background-color: black;
  height: 1px;
  width: 45%;
  margin: auto;
`;

const TakeWrapper = styled.div`
  text-align: center;
`;

const TakeButton = styled.button`
  margin: 25px;
`;

export default function({task, takeTask, user, moveTaskState}) {
  console.log(task);
  var image = null;
  var member = false
  if(task) {
    // TODO assigned sollte state sein
    image = task.imgurlink ? <Image src={task.imgurlink} /> : null;
    for(var i = 0; i < task.taskowners.length; i++) {
      if(task.taskowners[i] === user) {
        member = true;
      }
    }
  }
  var isLoggedIn = !!user;
  console.log(isLoggedIn);
  var takeTaskButton;
  if(isLoggedIn) {
    if(member) {
      takeTaskButton = <TakeButton onClick={moveTaskState}>move State</TakeButton>;
    } else {
      takeTaskButton = <TakeButton onClick={takeTask}>take task</TakeButton>;
    }
  } else {
    takeTaskButton = <Link to={"/signin"} >log in</Link>;
  }

  return (<div>
            {image}
            <Title>{task ? task.title : null}</Title>
            <Creator>by {task ? task.creator : null}</Creator>
            <Description> {task ? task.description : null}</Description>
            <Divider />
            <StatsTable>
              <tbody>
                <StatsRow>
                  <td>
                    state
                  </td>
                  <td>
                    {task.statename}
                  </td>
                </StatsRow>
                {task ? task.taskowners.map((taskOwner, i) => {
                  return (
                    <StatsRow key={i}>
                      <td>
                        { i === 0 ? 'taskOwners' : ''}
                      </td>
                      <td>
                      {taskOwner}
                      </td>
                    </StatsRow>
                  )
                }) : null}
              </tbody>
            </StatsTable>
            <Divider />
            {member ?
            null :
            <TakeWrapper>
              <TakeButton onClick={takeTask}>take task</TakeButton>
              <Divider />
            </TakeWrapper>}

          </div>
  )
};
