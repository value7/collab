import React from 'react';


export default function({tasks}) {
  console.log(tasks);
  return (
    <div>
      {tasks ? tasks.map((task) =>
        <div>{task.title}</div>
      ): null}
    </div>
  )
};
