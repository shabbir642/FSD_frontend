import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
export default class Verifymail extends Component {
	constructor(props){
		super(props);
		this.state = {
			is_token:'',
			error:'',
		}
	}
	componentDidMount(){
		axios.get(`http://localhost:8000/api/verify/${this.props.match.params.token}`).then((res) => {
			this.setState({is_token: true});
		}).catch((error) => {
			this.setState({error: "Please try again" });
		});
	}
	render() {
		if(this.state.is_token){
			return <Redirect to={'/login'}/>;
		}
		return (
			<div>
				{this.state.error}
			</div>
		)
	}
}