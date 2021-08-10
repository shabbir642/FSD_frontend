import React, { Component }from 'react';
import { connect } from 'react-redux'
import axios from "axios"
import Highcharts from 'highcharts'
import PieChart from 'highcharts-react-official'
import HighchartsReact from 'highcharts-react-official'
import { listask } from '../../Actions/Action'
function Dashboard(props){
	React.useEffect(() => {
		axios.get(`http://localhost:8000/api/listask`,{
			headers:{
				Authorization:`Bearer ${localStorage.getItem("token")}`,
			},
		}).then((response) => {
			// console.log(response);
		   props.listask(response.data);
		}).catch((error) => {
			console.log(error);
		});
	}, [])
	const tasks = props.tasks.tasks;
	// const tasks = task[0];
	const user  = JSON.parse(localStorage.getItem("user"));
	let comp = 0, asi = 0, prog = 0, total = 0;
	console.log(tasks);
	for(let i=0;i<tasks.length;i++){
		// console.log(tasks[i].assignee);
		if(tasks[i].assignee == user.id)
		{
			if(tasks[i].status == "Assigned") asi++;
			if(tasks[i].status == "Completed") comp++;
			if(tasks[i].status == "In-progress") prog++;
		}
	}
	total = asi + comp + prog;
	const option = {
		chart:{
			type: "pie",
		},
		title: {
			text: 'My performance',
			style: {
				fontSize: 25,
			}
		},
		series:[
		{
			data:[
			{y: asi, name: "Assigned",},
			{y: prog, name: "In-progress",},
			{y: comp, name: "Completed",},
			],
		}
		]
	}
	console.log(total);
	return(
		<div>
			{total ? <PieChart highchart={Highcharts} options={option} />
			:
			<div> 
			<p>My Performance</p>
			<p>No tasks!</p>
			</div>
		}
		</div>
		)
}
const mapStateToProps = (state)=> {
	// console.log(state);
	return {
		tasks: state.tasks,
	}
};

export default connect(mapStateToProps,{listask})(Dashboard);
// export default class Dashboard extends React.Component {
// 	constructor(props){
// 		super(props);
// 		this.state = {
// 		}
// 	}
// 	componentDidMount(){
// 		axios.get(`http://localhost:8000/api/listask`,{
// 			headers:{
// 				Authorization:`Bearer ${localStorage.getItem("token")}`,
// 			},
// 		}).then((response) => {
// 			this.props.listask(response.data);
// 		}).catch((error) => {
// 			console.log(error);
// 		});
// 	}
	
// 	render() {
// 		const { tasks } = this.props.tasks;
// 		const { user } = JSON.parse(localStorage.getItem("user"));
// 		return (
// 			<div className="container">

// 			</div>
// 		)
// 	}
// }