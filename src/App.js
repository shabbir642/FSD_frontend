import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Login from "./Component/Login";
import Signup from "./Component/Signup";
import Forgotpassword from "./Component/Forgotpassword";
import getdata from "./Component/getdata";
function App() {
  return (
    <Router>
    <div className="App">
       <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path ="/Signup">
            <Signup/>
            </Route>
            <Route path ="/Forgotpassword">
            <Forgotpassword/>
            </Route>
             <Route path ="/Login">
             <Login/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
    </Router>
  );
}
export default App;