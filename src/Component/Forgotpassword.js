import React, { Component } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
export default class Forgotpassword extends Component {
    login(){
      axios.post("http://localhost:8000/api/forgotpassword", {
           email:this.state.email,
        })
        .then((response) => {
            console.log(response);
         });
    
    }
    render() {
        return (
            <div>
                <h3>Forgot your Password?</h3>

                <div className="form-group">
                    <label>Email </label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange ={(e) => {this.setState({email:e.target.value})}} />
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick = {() => this.login()}>Submit</button>
            </div>
        );
    }
}