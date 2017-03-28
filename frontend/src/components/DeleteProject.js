import React from 'react';

//import styled from 'styled-components';

export default function({projectId, deleteTask}) {
  return (<div style={{marginTop: "50px"}}>
              This process can not be reversed
              <button onClick={() => (deleteTask(projectId))}>delete Project</button>
          </div>
  )
};
