import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Login from "./Login";
export default class SignUp extends Component {
   signup() {
        axios.post("http://localhost:8000/api/register", {
        	username: this.state.username,
           email:this.state.email,
           password: this.state.password,
           confirm_password: this.state.confirm_password
        })
        .then((response) => {
            console.log(response);
         })
        .catch((err) => {
        	console.log(err);
        	alert(err);
        });
	
	}
    render() {
        return (
            <div>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>User name</label>
                    <input type="text" className="form-control" placeholder="User name" onChange ={(e) => {this.setState({username:e.target.value})}}/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange ={(e) => {this.setState({email:e.target.value})}}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="text" className="form-control" placeholder="Enter password" onChange ={(e) => {this.setState({password:e.target.value})}}/>
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="text" className="form-control" placeholder="Re-enter password" onChange ={(e) => {this.setState({confirm_password:e.target.value})}}/>
                </div>
                    <button type="submit" className="btn btn-primary btn-sm" onClick = {() => this.signup()}>Sign Up</button>
                   <p className="forgot-password text-right">
                   Already have an account?<Link to="/Login">Login</Link>
                   </p>
            </div>
        );
    }
}