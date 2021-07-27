import React, { Component } from "react";
import { BrowserRouter as Router, withRouter, Switch, Route, Link} from "react-router-dom";
import axios from "axios";
import { connect } from 'react-redux';
import { ActionCreators } from '../myaction';
import { isValidEmail } from '../validmail';
export class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                email: '',
                password: '',
                confirm_password:''
            },
            errors: {
                er_user: {
                    username: 'Enter username',
                    email: 'Enter email!',
                    password: 'Enter password',
                    confirm_password: 'Re-enter password'
                }
            },
            validform: false,
            regiterstatus: '',
            submitted: false
        }
    }
 componentDidMount() {
    if(this.props.profile) {
      this.setState({ user: this.props.profile });
      if (this.props.profile.email) {
        this.resetErrorMsg();
      }
    }
  }
    checkerror = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'username':
                errors.er_user.username = value.length < 1 ? 'Enter username' : '';
                break;
            case 'email':
                errors.er_user.email = value.length < 1 ? 'Email is not valid!' : '';
                break;
            case 'password':
                errors.er_user.password = value.length < 1 ? errors.er_user.password : '';
                break;
            case 'confirm_password':
                errors.er_user.confirm_password = value.length < 1 ? errors.er_user.confirm_password : '';
                break;
            default:
                break;
        }
        this.setState({ errors });
    }
    inputchange = (event) => {
        const { name, value } = event.target;
        const user = this.state.user;
        user[name] = value;
        this.setState({ user });
        this.checkerror(event);
    }
    
    validateForm = (errors) => {
        let valid = true;
        Object.entries(errors).forEach(item => {
            // console.log(item)
            item && item[1].length > 0 && (valid = false)
        })
        return valid;
    }

    signup = async (event) => {
        this.setState({ submitted: true });
        event.preventDefault();
        if (this.validateForm(this.state.errors)) {
            console.log(this.state.user.confirm_password);
            axios.post('http://localhost:8000/api/register', {
                    username: this.state.user.username,
                    email: this.state.user.email,
                    password: this.state.user.password,
                    confirm_password: this.state.user.confirm_password
                })
                .then((response) => {
                    console.log(response);
                    if (response.data.code == 200) {
                        this.props.dispatch(ActionCreators.signup(this.state.user));
                        this.props.history.push('/Login');
                        console.log("Shabbir hussain");
                    } else {
                        this.setState({ regiterstatus: 'Email id already exist ' })
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert(err);
                });
        } else {
            console.log("Invalid form");
        }
    }

    resetErrorMsg = () => {
        let errors = this.state.errors;
        errors.err_user.username = ''
        errors.er_user.email = ''
        errors.er_user.password=''
        errors.er_user.confirm_password=''
        this.setState({ errors });
    }
    render() {
        const { username, email, password, confirm_password } = this.state.user;
        const { submitted } = this.state;
        return (
            <div className="auth-inner">
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>User name</label>
                    <input type="text" value={username} name = "username" id="username" className="form-control" placeholder="User name" onChange ={(e) => {this.inputchange(e)}}/>
                    {submitted && this.state.errors.er_user.username.length > 0 && <span className='error'>{this.state.errors.er_user.username}</span>}
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" value={email} name = "email" id = "email" className="form-control" placeholder="Enter email" onChange ={(e) => {this.inputchange(e)}} />
                    {submitted && this.state.errors.er_user.email.length > 0 && <span className='error'>{this.state.errors.er_user.email}</span>}               
                 </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="text" value={password} name = "password" id = "password" className="form-control" placeholder="Enter password" onChange ={(e) => {this.inputchange(e) }} />
                     {submitted && this.state.errors.er_user.password.length > 0 && <span className='error'>{this.state.errors.er_user.password}</span>}   
               </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                   <input type="text" value={confirm_password} name = "confirm_password" id = "confirm_password" className="form-control" placeholder="Enter confirm password" onChange ={(e) => {this.inputchange(e) }} />
                    {submitted && this.state.errors.er_user.confirm_password.length > 0 && <span className='error'>{this.state.errors.er_user.confirm_password}</span>}          
                </div>
                    <button type="submit" className="btn btn-primary btn-sm" onClick = {() => this.signup()}>Sign Up</button>
                   <p className="forgot-password text-right">
                   Already have an account?<Link to="/Login">Login</Link>
                   </p>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        profile: state.user.profile

    }
}
export default connect(mapStateToProps)(withRouter(Signup));

