import { Types } from '../Actions/Actiontypes';
const initialState = {
	users: []
};
const taskReducer = ( state = initialState, action) => {
	switch(action.type){
		case Types.LISTUSER: {
		return {
			...state,
			users: [...action.payload.users]
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
	default: {
		return state;
	}
	}
 };

export default taskReducer;