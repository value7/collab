// import React from 'react'
// import { Link } from 'react-router'
//
// export default React.createClass({
//   render() {
//     return (
//       <div>
//         <h1>React Router Tutorial</h1>
//         <ul>
//           <li><Link to="/Projects">About</Link></li>
//           <li><Link to="/About">Repos</Link></li>
//           <li><Link to="/ApiTest">Api Test</Link></li>
//           <li><Link to="/securedApi">secured Api</Link></li>
//           <li><Link to="/login">login</Link></li>
//         </ul>
//         {this.props.children}
//       </div>
//     )
//   }
// })


import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/user';
import { VisibleOnlyAdmin, VisibleOnlyLoggedIn } from '../utils/authWrapper';

const OnlyAdminLink = VisibleOnlyAdmin(() => <Link to="/admin">{'Admin'}</Link>);
const CreateProject = VisibleOnlyLoggedIn(() => <Link to="/createProject">{'Create Project'}</Link>);

function Header({ children, dispatch }) {
  return (
    <div>
      <header>
        {' '}
        <Link to="/projects">Projects</Link>
        {' '}
        <CreateProject />
        {' '}
        <OnlyAdminLink />
        {' '}
        <Link to="/signin">Sign In</Link>
        {' '}
        <Link to="/signup">Sign Up</Link>
        {' '}
        <button onClick={() => dispatch(logoutUser())}>Logout</button>
      </header>
      <div style={{ marginTop: '1.5em' }}>{children}</div>
    </div>
  )
}

export default connect()(Header)
