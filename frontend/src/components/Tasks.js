import React from 'react';

import AddTask from '../containers/AddTaskContainer';

export default function({tasks, projectId}) {
  console.log(tasks);
  var newTask = {};
  newTask.title = 'testTask57';
  newTask.desctiption = 'testTask67 Beschriftung';
  return (
    <div>
      {tasks ? tasks.map((task, i) =>
        <div key={i}>{task.title}</div>
      ): null}
      <AddTask projectId={projectId}/>
    </div>
  )
};
