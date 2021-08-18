import { Types } from '../Actions/Actiontypes';
const initialState = {
	users: []
};
const taskReducer = ( state = initialState, action) => {
	switch(action.type){
		case Types.LISTUSER: {
		return {
			...state,
			users: [...action.payload]
	 	};
	  }
	  case Types.SIGNUP:
	  return{
	  	...state,
	  	users:[...state.users, action.payload]
	  }
	  case Types.DELETEUSER:{
	  const id = action.payload;
	  return{
	  	...state,
	  	users: [...state.users.filter((user) => user.id !== id)]
	  };
	  }
	  case Types.MAKEADMIN:{
	  	const id = action.payload;
	  	return {
	  		...state,
	  		users: state.users.map(user => {
	  			if(user.id !== id){
	  				return user
	  			}
	  			return {
	  				...user,
	  				admin: !user.admin
	  			}
	  		})
	  	}
	  }
	  case Types.REMOVEADMIN:{
	  	const id = action.payload;
	  	return {
	  		...state,
	  		users: state.users.map(user => {
	  			if(user.id !== id){
	  				return user
	  			}
	  			return {
	  				...user,
	  				admin: !user.admin
	  			}
	  		})
	  	}
	  }
	default: {
		return state;
	}
	}
 };

export default taskReducer;
