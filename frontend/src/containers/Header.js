import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>React Router Tutorial</h1>
        <ul>
          <li><Link to="/Projects">About</Link></li>
          <li><Link to="/About">Repos</Link></li>
          <li><Link to="/ApiTest">Api Test</Link></li>
          <li><Link to="/login">login</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
