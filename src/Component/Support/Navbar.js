import React from 'react';
import { Link } from 'react-router-dom';
export default class Navbar extends React.Component {

    render() {
        return (
          <>
          {/*<div className="auth-wrapper">*/}
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/Navbar"}>Vmock Task Manager</Link>
            { !localStorage.getItem("token") ? (
              <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>Login</Link>
               </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/signup"}>Sign up</Link>
              </li> 
              </ul>
              ) : (
               <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/logout"}>Logout</Link>
              </li>
              </ul>
               ) 
            }
        </div>
      </nav>
      </>
        )
    }
}