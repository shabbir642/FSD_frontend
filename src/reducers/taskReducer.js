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
			tasks: [...action.payload]
	 	};
	  }
	  case Types.DELETETASK:{
	  	const id = action.payload;
	  	return {
	  		...state,
	  		tasks:[...state.tasks.filter((task) => task.id!=id)]
	  	}
	  }
	  case Types.UPDATETASK:{
	  	const id = action.payload.id;
	  	return {
	  		...state,
	  		tasks: state.tasks.map(task => {
	  			if(task.id !== id){
	  				return task
	  			}
	  			return {
	  				...task,
	  				title: action.payload.title,
	  				description: action.payload.description,
	  				deadline: action.payload.deadline,
	  				assignee: action.payload.assignee
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
