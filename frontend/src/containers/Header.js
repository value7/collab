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
import { logout } from '../actions';
import { VisibleOnlyAdmin } from '../utils/authWrapper';

const OnlyAdminLink = VisibleOnlyAdmin(() => <Link to="/admin">{'Admin'}</Link>);

function Header({ children, logout }) {
  return (
    <div>
      <header>
        Links:
        {' '}
        <Link to="/Projects">About</Link>
        {' '}
        <Link to="/About">Repos</Link>
        {' '}
        <Link to="/ApiTest">Api Test</Link>
        {' '}
        <Link to="/securedApi">secured Api</Link>
        {' '}
        <Link to="/foo">{'Foo (Login Required)'}</Link>
        {' '}
        <OnlyAdminLink />
        {' '}
        <Link to="/login">Login</Link>
        {' '}
        <Link to="/loginState">Login State</Link>
        {' '}
        <button onClick={() => logout()}>Logout</button>
      </header>
      <div style={{ marginTop: '1.5em' }}>{children}</div>
    </div>
  )
}

export default connect(false, { logout })(Header)
