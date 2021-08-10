import { Types } from '../Actions/Actiontypes';
const initialState = {
  isloggedin: localStorage.getItem("token") ? true: false,
  loggeduser: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): {},
};
const authReducer = (state = initialState, action) => {
	switch (action.type){
	  case Types.LOGIN:
	  // console.log('here')
	  return{
	  	...state,
	  	isloggedin:true,
	  	loggeduser: action.payload,
	  	
	  }
	  case Types.LOGOUT:
	  return{
	  	...state,
	  	isloggedin: false,
	  	loggeduser: {},
	  }
	default:
	 return state 
}
}

export default authReducer;