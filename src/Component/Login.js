import React, { Component, useContext } from "react";
import { BrowserRouter as Router, withRouter, Switch, Route, Link} from "react-router-dom";
import axios from "axios";
import { connect } from 'react-redux';
import { ActionCreators } from '../myaction';
import Auth from '../auth';
export class Login extends Component {
     constructor (props){
        super(props);
        this.state = {
            email:'',
            password:'',
            errors: {
                email:'Enter email!',
                password:'Enter password'
            },
            loginstatus:'',
            submitted:false,
            // Auth:React.useContext(Authapi)
        }
    }
   inputchange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]:value});
        this.checkerror(event);
    }
    checkerror = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name){
            case 'email': 
             errors.email = value.length < 1 ? errors.email : '';
             break;
            case 'password':
            errors.password = value.length < 1 ? errors.password : '';
            break;
        default:
         break;
        }
        this.setState({ errors });
    }

   validateForm = (errors) => {
    let valid = true;
    // console.log(errors)
    Object.entries(errors).forEach(item => {
      // console.log(item)
      item && item[1].length > 0 && (valid = false)
    })
    // console.log(valid)
    return valid;
  }
     login = async (event) => {
        Auth.authenticate();
        this.setState({ submitted : true });
        event.preventDefault();
        if(this.validateForm(this.state.errors)){
            console.log('Valid form');
         axios.post("http://localhost:8000/api/login", {
           email:this.state.email,
           password: this.state.password
        },
        {
            withCredentials:true
        })
        .then((response) => {
            console.log(response);
            if(response.data.message == 'Success'){
                this.props.dispatch(ActionCreators.login(this.state.email ,this.state.password));
                this.props.history.push('/Welcome');
                console.log("Shabbir hussain");
            }
            else{
                this.setState({ loginstatus: 'Login failed! Invalid email and password '})
            }
         });
      }
      else {
        console.log('Invalid form');
      }
    }
    render() {
        const { email, password, errors, submitted, loginstatus } = this.state;
        return (
            <>
            <div className="auth-wrapper">
            <div className="auth-inner">
                <h3>Sign In</h3>
               <div className="form-group">
                    <label>Email address</label>
                    <input type="email" value={email} name = "email" id = "email" className="form-control" placeholder="Enter email" onChange ={(e) => {this.inputchange(e)}} />
                    {submitted && errors.email.length > 0 && <span className='error'>{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="text" value={password} name = "password" id = "password" className="form-control" placeholder="Enter password" onChange ={(e) => {this.inputchange(e) }} />
                    {submitted && errors.password.length > 0 && <span className='error'>{errors.password}</span>}
                </div>
                <div>
                    {submitted && loginstatus.length > 0 && <span className='error'>{loginstatus}</span>}
                </div>
                <button type="submit" className="btn btn-primary" onClick = {this.login}>Submit</button>
                  <p className ="forgot-password text-right">
                  New User? <Link to ="/Signup">Signup</Link>
                  </p> 
                  <p className ="forgot-password text-right">
                  Forgot <Link to ="/Forgotpassword">password?</Link>
                  </p> 
          </div>
          </div>
          </>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        profile: state.user.profile

    }
}
export default connect(mapStateToProps)(withRouter(Login));
// disabled={!(email.length && password.length)} 
