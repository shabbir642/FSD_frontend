import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
export default class Resetpassword extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			password:'',
			confirm_password:'',
			reply:'',
			error:'',
		}
	}
	inputchange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]:value});
    }
	login(){
		axios.post(`http://localhost:8000/api/resetpassword`,{
			token:this.props.match.params.token,
			password:this.state.password,
			confirm_password: this.state.confirm_password
		}).then((res) => {
			this.setState({reply:true});
		}).catch((err) => {
			console.log(err);
			this.setState({error:true});
		})
	}

	render() {
		const{email, password, confirm_password} = this.state;
		if(this.state.reply){
			return <Redirect to={'/login'}/>;
		}
		return (
			<div className="auth-wrapper">
				<div className="auth-inner">
				{this.state.error ?
					<div>Enter a valid email id or sign up first</div>
					: " "
				}
                <h3>Reset your Password</h3>
                 <div className="form-group">
                    <label>New Password</label>
                    <input type="text" value={password} name = "password" id = "password" className="form-control" placeholder="Enter new password" onChange ={(e) => {this.inputchange(e) }} />
               </div>

                <div className="form-group">
                    <label>Confirm New Password</label>
                   <input type="text" value={confirm_password} name = "confirm_password" id = "confirm_password" className="form-control" placeholder="Enter confirm password" onChange ={(e) => {this.inputchange(e) }} />
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick = {() => this.login()}>Submit</button>
            </div>
          </div>
		);
	}
}