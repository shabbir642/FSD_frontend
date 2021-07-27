import React from 'react';
import {connect} from 'react-redux';
import { ActionCreators } from '../myaction';
import axios from "axios";
import Cookies from 'js-cookie';
import Auth from '../auth';
function Logout(){
	console.log('Vmock');
	Auth.signout();
	axios.get("http://localhost:8000/api/logout")
	.then((response) => {
		
		Cookies.remove("token");
		this.props.dispatch(ActionCreators.logout());
		this.history.push('/Login');
	})
	.catch((error) => {
		console.log(error);
		alert(error);
	});
	return(
		<div> 
		 Logging out...
	  </div>
		)
}
export default connect(null)(Logout);