import React from 'react';
import {connect} from 'react-redux';
import { logout } from '../../Actions/Action';
import axios from "axios";
function Logout(props){
    React.useEffect(() => {
	axios.get("http://localhost:8000/api/logout",{
		headers: {
			'Authorization': `Bearer ${localStorage.getItem("token")}`,
		},
	})
	.then((response) => {
		console.log(response);
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		props.logout();
		props.history.push('/Login');
	})
	.catch((error) => {
		console.log(error);
		// alert(error);
	});
	
}, )
	
	return(
		<div> 
		 Logging out...
	  </div>
		)
}
export default connect(null,{ logout })(Logout);
