import React from 'react';

export default function({projects, upvote}) {
  console.log(projects);

  return (
    <div>{Object.keys(projects).map((key, i) => {
      var hasImage = !!projects[key].imgurlink;
      console.log(projects[key].imgurlink);
      console.log(hasImage);
      return <div key={i}>
        <div>{projects[key].votes}</div>
        <div>{projects[key].title}</div>
        {
          hasImage &&
          <img width={150} src={projects[key].imgurlink} />
        }
        <div>{projects[key].description}</div>
        <button onClick={() => (upvote(projects[key].id))}>up vote</button>
      </div>
    })}</div>
  )
};
