import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import Routes from './Routes';
import Cookies from 'js-cookie';
import Auth from './Component/Support/auth';
function App(){
        return (
          <Router>
             <div className="App"> 
                 <Routes/> 
              </div>
        </Router>
        );
}
export default App
