import React from 'react';
import { Link } from 'react-router';

export default function({projects, upVote, cancelUpVote, upvoted}) {
  console.log(projects);

  return (
    <div>
      {Object.keys(projects).map((key, i) => {
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
          {upvoted.indexOf(projects[key].id) < 0
          ? <button onClick={() => (upVote(projects[key].id))}>up vote</button>
          : <button onClick={() => (cancelUpVote(projects[key].id))}>take back</button>}
          <Link to={"/projects/" +projects[key].id} >Link to details</Link>
        </div>
      })}
    </div>
  )
};
