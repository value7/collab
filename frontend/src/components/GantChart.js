import React from 'react';
import styled from 'styled-components';

const Chart = styled.div`
  width: 100%;
`;

const ChartRow = styled.div`
  position: relative;
  background-color: #e0e0e0;
  height: 20px;
`;

const ChartBar = styled.div`
  position: absolute;
  background-color: red;
  height: 90%;
  margin: auto;
  left: ${props => props.left};
  width: ${props => props.width};
  z-index: 2;
  top: 0px;
`;

const Title = styled.div`
  width: 50px;
  height: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`;

function dayDiff(begin, end) {
  console.log(end, begin);
  let timeDiff = Math.abs(new Date(end).getTime() - new Date(begin).getTime());
  let dayRange = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return dayRange;
}

export default function({begin, finish, tasks}) {
  console.log(begin);
  console.log(finish);
  console.log(tasks);
  const task = tasks[3];
  console.log(task);
  let time = dayDiff(begin, finish);
  return (
    <Chart>
      {Object.keys(tasks).map((key, i) => {
        let length = dayDiff(tasks[key].startdate, tasks[key].enddate);
        let width = ((length / time)*100).toString().slice(0,2) + '%';
        console.log(begin);
        let startDiff = dayDiff(begin, tasks[key].startdate);
        let left = ((startDiff / time)*100).toString().slice(0,2) + '%';
        console.log(left);
        return (
          <ChartRow>
            <Title>{tasks[key].title}</Title>
            <ChartBar left={left} width={width} />
          </ChartRow>
        )
      })}

    </Chart>
  )
};
