 import { Types } from './Actiontypes';

export const signup = (user) => {
	return {
		type: Types.SIGNUP,
		payload: user, 
	};
};
export const login = (user) => {
	// console.log('here')
	return {
		type: Types.LOGIN,
		payload: user, 
	};
};
export const logout = () => {
	return {
		type: Types.LOGOUT,
	};
};
export const deleteuser = (id) => {
	return {
		type: Types.DELETEUSER,
		payload: id, 
	};
};
export const listuser = (users) => {
	return {
		type: Types.LISTUSER,
		payload: users, 
	};
};
export const addtask = (task) => {
	return {
		type: Types.ADDTASK,
		payload: task, 
	};
};
export const deletetask = (id) => {
	return {
		type: Types.DELETETASK,
		payload: id, 
	};
};
export const listask = (tasks) => {
	return{
		type: Types.LISTASK,
		payload: tasks,
	};
};
export const updatetask = (task) => {
	return{
		type: Types.UPDATETASK,
		payload: task,
	};
};
export const makeadmin = (id) => {
	return {
		type: Types.MAKEADMIN,
		payload: id, 
	};
};
export const removeadmin = (id) => {
	return {
		type: Types.REMOVEADMIN,
		payload: id, 
	};
};
