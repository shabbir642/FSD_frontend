import React, { Component, useContext } from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route, Link } from "react-router-dom";
import Login from "./Component/Login";
import Logout from './Component/Logout';
import Signup from "./Component/Signup";
import Forgotpassword from "./Component/Forgotpassword";
import Getdata from "./Component/Getdata";
import Navbar from "./Navbar";
import Userpage from './Component/Userpage';
import Welcome from './Component/Welcome'
import Auth from './auth';

const Routes = (props) => (
    <Switch>
            <Route exact path='/' component={Navbar} />
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup} />
            <Protectedroutes path="/Getdata" component={Getdata}/>
            <Protectedroutes path ="/Logout" component={Logout}/>
            <Protectedroutes path="/userpage" component={Userpage}/>
            <Protectedroutes path="/Welcome" component={Welcome}/>
          </Switch>
)
const Protectedroutes = ({ component: Component, ...rest }) => (
           <Route
              {...rest}
                  render={props =>
                          Auth.getAuth() ? (
                          <Component {...props} />
                          ): (
                     <Redirect
                            to={{
                            pathname: "/"
                            }}
                      />
                      )
                    }
             />
         );
export default Routes;
