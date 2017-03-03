import React from 'react';

export default function({project}) {
  console.log(project);
  var hasImage = !!project.imgurlink;
  return (
    <div>
    <div>{project.votes}</div>
    <div>{project.title}</div>
    {
      hasImage ?
      <img width={150} src={project.imgurlink} /> :
      <p> sadly there is no image for this project </p>
    }
    <div>{project.description}</div>
    </div>
  )
};
