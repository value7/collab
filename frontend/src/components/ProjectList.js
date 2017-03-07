import React from 'react';
import { Link } from 'react-router';

import styled from 'styled-components';

const Image = styled.img`
  width: 39%;
  float: right;
  margin-bottom: 25px;
`;
const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;

const Title = styled.div`
  font-size: 24px;
  margin-bottom: 25px;
  width: 50%;
`;

const TextWrapper = styled.div`
  width: 60%;
  float: left;
`;

const Description = styled.div`
  margin-bottom: 25px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: black;
  clear: both;
`;

export default function({projects, upVote, cancelUpVote, upvoted}) {
  console.log(projects);

  return (
    <div>
      {Object.keys(projects).map((key, i) => {
        var hasImage = !!projects[key].imgurlink;
        console.log(projects[key].imgurlink);
        console.log(hasImage);
        return <Wrapper key={i}>
        <Link to={"/projects/" +projects[key].id} >
          <TextWrapper>
            <Title>{projects[key].title}</Title>
            <div>{projects[key].description}</div>
            <div>{projects[key].votes} Votes</div>
            {upvoted.indexOf(projects[key].id) < 0
            ? <button onClick={() => (upVote(projects[key].id))}>up vote</button>
            : <button onClick={() => (cancelUpVote(projects[key].id))}>take back</button>}
          </TextWrapper>
          {
            hasImage &&
            <Image src={projects[key].imgurlink} />
          }
          </Link>
          <Divider />
        </Wrapper>
      })}
    </div>
  )
};
