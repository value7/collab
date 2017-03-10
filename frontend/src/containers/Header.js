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
  @media (max-width: 600px) {
    width: 95%;
  }
`;

const StyledHeader = styled.header`
  background-color: #fafafa;
  text-align: right;
`;

const HeaderLeft = styled.div`
  float: left;
  display: inline-block;
`;

const HeaderRight = styled.div`
  text-align: right;
  display: inline-block;
`;


const Margin = styled.div`
  margin: 15px;
  display: inline-block;
  font-size: 24px;
`;

const OnlyAdminLink = VisibleOnlyAdmin(() => <Margin><Link to="/admin">{'Admin'}</Link></Margin>);
const CreateProject = VisibleOnlyLoggedIn(() => <Margin><Link to="/createProject">{'Create Project'}</Link></Margin>);

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
          <Margin><button onClick={() => dispatch(logoutUser())}>Logout</button></Margin>
        </HeaderRight>
      </StyledHeader>
      <Body>{children}</Body>
    </div>
  )
}

export default connect()(Header)
