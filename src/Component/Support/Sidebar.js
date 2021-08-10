import React from 'react';
import './style.css';
import { Link } from "react-router-dom";
function Sideheader() {
  //    logout(e) {
  //   e.preventDefault()
  //   localStorage.clear();
  //   this.props.history.push(`/`);
  // }
    return (
        <>
        <div className="sidenav">
           <h1>Vmock Task</h1> 
           <Link to="/Dashboard">Dashboard</Link>
           <Link to="/Tasklist">Task</Link>
           <Link to="/Userlist">Users</Link>
           { localStorage.getItem("token") && JSON.parse(localStorage.getItem("user")).admin ? <Link to="/Alltask">Alltask</Link> : " "}
           <Link to="/Logout">Logout</Link>

        </div>
        </>
    )
}
export default Sideheader;