import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/user';
import { VisibleOnlyAdmin, VisibleOnlyLoggedIn } from '../utils/authWrapper';
import styled from 'styled-components';

const Body = styled.div`
  width: 60%;
  margin: auto;
  background-color: #fafafa;
  height: 100%;
  margin-top: 25px;
  @media (max-width: 600px) {
    width: 95%;
  }
`;

const StyledHeader = styled.header`
  background-color: #fafafa;
  text-align: right;
  @media (max-width: 700px) {
    text-align: center;
  }
`;

const HeaderLeft = styled.div`
  float: left;
  display: inline-block;
  @media (max-width: 700px) {
    display: block;
    float: none;
  }
`;

const HeaderRight = styled.div`
  text-align: right;
  display: inline-block;
  @media (max-width: 700px) {
    display: block;
  }
`;


const Margin = styled.div`
  margin: 15px;
  display: inline-block;
  font-size: 24px;
  @media (max-width: 700px) {
    text-align: center;
    margin: auto;
    display: block;
    padding: 10px;
    border-bottom: 1px outset #f4f4f4;
  }
`;

const OnlyAdminLink = VisibleOnlyAdmin(() => <Margin><Link to="/admin">{'Admin'}</Link></Margin>);
const CreateProject = VisibleOnlyLoggedIn(() => <Margin><Link to="/createProject">{'Create Project'}</Link></Margin>);
const LogOut = VisibleOnlyLoggedIn(({dispatch}) => <Margin><button onClick={() => dispatch(logoutUser())}>Logout</button></Margin>);

function Header({ children, dispatch }) {
  return (
    <div>
      <StyledHeader>
        <HeaderLeft>
          {' '}
          <Margin><Link to="/projects">Projects</Link></Margin>
          {' '}
          <CreateProject />
          {' '}
          <OnlyAdminLink />
        </HeaderLeft>
        <HeaderRight>
          {' '}
          <Margin><Link to="/signin">Sign In</Link></Margin>
          {' '}
          <Margin><Link to="/signup">Sign Up</Link></Margin>
          {' '}
          <LogOut dispatch={dispatch}/>
        </HeaderRight>
      </StyledHeader>
      <Body>{children}</Body>
    </div>
  )
}

export default connect()(Header)
