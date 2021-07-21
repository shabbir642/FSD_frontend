import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export default class Login extends Component {
    login(){
      axios.post("http://localhost:8000/api/login", {
           email:this.state.email,
           password: this.state.password
        })
        .then((response) => {
            console.log(response);
         });
    
    }
    render() {
        return (
            <div>
                <h3>Sign In</h3>
            
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange ={(e) => {this.setState({email:e.target.value})}} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="text" className="form-control" placeholder="Enter password" onChange ={(e) => {this.setState({password:e.target.value})}} />
                </div>

                <button type="submit" className="btn btn-primary" onClick = {() => this.login()}>Submit</button>
                  <p className ="forgot-password text-right">
                  New User? <Link to ="/Signup">Signup</Link>
                  </p> 
                  <p className ="forgot-password text-right">
                  Forgot <Link to ="/Forgotpassword">password?</Link>
                  </p> 
            </div>
        );
    }
}
// disabled={!(email.length && password.length)} 