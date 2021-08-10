import { Types } from '../Actions/Actiontypes';
const initialState = {
	tasks: []
};
const taskReducer = ( state = initialState, action) => {
	switch(action.type){
		case Types.ADDTASK:{
			return {
				...state,
				tasks:[...state.tasks, action.payload]
			}
		}
		case Types.LISTASK: {
		return {
			...state,
			tasks: [...action.payload.tasks]
	 	};
	  }
	  case Types.DELETETASK:{
	  	const id = action.payload;
	  	return {
	  		...state,
	  		tasks:[...state.tasks.filter((task) => task.id!=id)]
	  	}
	  }
	default: {
		return state;
	}
	}
 };

export default taskReducer;