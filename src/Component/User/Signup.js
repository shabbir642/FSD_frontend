import React, { Component } from "react";
import { BrowserRouter as Router, withRouter, Switch, Route, Link} from "react-router-dom";
import axios from "axios";
import { connect } from 'react-redux';
import { signup } from '../../Actions/Action';
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
            registerstatus: '',
            submitted: false
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

    signup = async (event) => {
        this.setState({ submitted: true });
        // console.log(event);
         event.preventDefault();
        axios.post(`http://localhost:8000/api/register`, {
                    username: this.state.user.username,
                    email: this.state.user.email,
                    password: this.state.user.password,
                    confirm_password: this.state.user.confirm_password
                })
                .then((response) => {
                    console.log(response);
                        this.props.signup(this.state.user);
                        this.props.history.push('/Login');
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({ registerstatus: "Email already exist" });
                });
    }
    render() {
        const { username, email, password, confirm_password } = this.state.user;
        const { registerstatus, submitted } = this.state;

        return (
            <div className="auth-wrapper">
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
                 <div>
                    {submitted && registerstatus.length > 0 && <span className='error'>{registerstatus}</span>}
                </div>
                    <button type="submit" className="btn btn-primary btn-sm" onClick = {this.signup}>Sign Up</button>
                   <p className="forgot-password text-right">
                   Already have an account?<Link to="/Login">Login</Link>
                   </p>
            </div>
            </div>
        );
    }
}

export default connect(null, { signup })(Signup);

