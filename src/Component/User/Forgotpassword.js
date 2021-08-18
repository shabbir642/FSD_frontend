import React, { Component } from "react";
import axios from "axios";
export default class Forgotpassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            reply:'',
            error:'',
        }
    }
    login(){
      axios.post("http://localhost:8000/api/forgotpassword", {
         email:this.state.email,
     })
      .then((response) => {
        console.log(response);
        this.setState({reply: true});
    }).catch((error) => {
        if(error.response.status === 401){
            this.setState({error: 401});
        }
        if(error.response.status === 404){
            this.setState({error: 404 });
        }
    });
    
}
render() {
        return (
            <div className="auth-wrapper">
            <div className="auth-inner">
            {this.state.reply ? 
                <div>Click on the link send on your email to reset Password</div>
                :" "
            }
            {this.state.error === 401 ? 
             <div>Plese verify your email id</div>
             :" "
         }
         {this.state.error === 404 ?
          <div>Email id not exist</div>:" "
      }
      <h3>Forgot your Password?</h3>

      <div className="form-group">
      <label>Email </label>
      <input type="email" className="form-control" placeholder="Enter email" onChange ={(e) => {this.setState({email:e.target.value})}} />
      </div>
      <button type="submit" className="btn btn-primary btn-block" onClick = {() => this.login()}>Submit</button>
      </div>
      </div>
      );
    }
}
