import React, { Component, useEffect, useState }from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import Highcharts from 'highcharts';
import PieChart from 'highcharts-react-official';
import HighchartsReact from 'highcharts-react-official';
import { listask } from '../../Actions/Action';
import Sideheader from "./Sidebar";
import Todaytask from '../Task/Todaytask';
import { Card } from 'react-bootstrap';
function Dashboard(props){
	useEffect(() => {
		axios.get(`http://localhost:8000/api/listask`,{
			headers:{
				Authorization:`Bearer ${localStorage.getItem("token")}`,
			},
		}).then((response) => {
			console.log(response);
			props.listask(response.data);
		}).catch((error) => {
			console.log(error);
		});
	},[])
	const task = props.tasks.tasks;
	const user  = JSON.parse(localStorage.getItem("user"));
	let comp = 0, asi = 0, prog = 0, total = 0;
	// console.log(tasks);
	for(let i=0;i<task.length;i++){
		if(task[i].assignee === user.id)
		{
			if(task[i].status === "Assigned") asi++;
			if(task[i].status === "Completed") comp++;
			if(task[i].status === "In-progress") prog++;
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
		plotOptions: {
			pie: {
				showInLegend: true
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
	const[myuser, setmyuser] = useState("");
	console.log(total);
	return(
		<>
		<Sideheader />
		<div className="container" style={{marginLeft:"80px", marginTop:"60px"}}>
		<div className="row" >
		<div className="col-1">
		</div>
		<div className="col-5">
		<label >Your task for today</label>
		<Todaytask />
		</div> 
		<div className="col-1"></div>
		<div className="col-5" style={{height:"400px"}}>
		<Card className="h-100">
		<div className="card-body">
		{total ? <PieChart highchart={Highcharts} options={option} />
		:
		<div className="auth-inner"> 
		<h1>My Performance</h1>
		<p>No tasks!</p>
		</div>
	}
	</div>
	</Card>
	</div>
	<div className="col" style={{marginLeft: "80px"}} >
	<Highcharttt data={props.tasks} />
	{/*<Overall data={props.tasks}/>*/}
	</div>
	</div>
	</div>
	</>
	)
}
function Highcharttt(props){
	const task = props.data.tasks;
	let comp = [0], asi = [0], prog = [0], total = 0;
	let dates = [];
	console.log(task.length);
	if(task.length === 0){
		return (
			<div>No data </div>
			)
	}
	dates.push(task[0].deadline.split(' ')[0]);
	if(task[0].status === "Assigned") asi[0]++;
	if(task[0].status === "Completed") comp[0]++;
	if(task[0].status === "In-progress") prog[0]++;
	let j = 0;
	for(let i=1;i<task.length;i++){
		while(i<task.length && task[i].deadline.split(' ')[0] === task[i-1].deadline.split(' ')[0]){
			if(task[i].status === "Assigned") asi[j]++;
			if(task[i].status === "Completed") comp[j]++;
			if(task[i].status === "In-progress") prog[j]++;
			i++;
		}
		if(i<task.length){
			dates.push(task[i].deadline.split(' ')[0]);
			j++;
			asi.push(0);
			prog.push(0);
			comp.push(0);
			if(task[i].status === "Assigned") asi[j]++;
			if(task[i].status === "Completed") comp[j]++;
			if(task[i].status === "In-progress") prog[j]++;
		}
	}
	total = task.length; 
	const option = {
		chart:{
			type: 'column'
		},
		title:{
			text: 'Overall performance'
		},
		xAxis:{
			categories: dates,
		},
		yAxis:{
			min:0,
			title:{
				text: 'Tasks'
			}
		},
		series:[
		{name:'Assigned', data: asi},
		{name:'In-progress', data: prog},
		{name:'Completed', data: comp}
		]
	}
	return(
		<>
		{total ?
			<HighchartsReact highchart={Highcharts} options={option} />
			:
			<div className="auth-inner"> 
			<h1>Overall Performance</h1>
			<p>No tasks!</p>
			</div>
		}
		</>
		)
}
function Overall(props){
	const task = props.data.tasks;
	console.log(task);
	let comp = 0, asi = 0, prog = 0, total = 0;
	for(let i=0;i<task.length;i++){
		if(!props.myuser){
			console.log('here');
			if(task[i].status === "Assigned") asi++;
			if(task[i].status === "Completed") comp++;
			if(task[i].status === "In-progress") prog++;
		} else {
			if(task[i].assignee === props.myuser)
			{
				if(task[i].status === "Assigned") asi++;
				if(task[i].status === "Completed") comp++;
				if(task[i].status === "In-progress") prog++;
			}
		}
	}
	total = asi + comp + prog;
	let user = '';
	if(props.myuser === ""){
		user = 'Overall performance';
	} else {
		user = props.myuser + 'performance';
	}
	
	const option = {
		chart:{
			type: "pie",
		},
		title: {
			text:user,
			style: {
				fontSize: 25,
			}
		},
		plotOptions: {
			pie: {
				showInLegend: true
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
	console.log('Overall');
	return(
		<>
		{total ? 
			<PieChart highchart={Highcharts} options={option} />
			:(
				<div className="auth-inner"> 
				{!props.myuser ?
					(<>
						<h1>Overall Performance</h1>
						<p>No tasks!</p>
						</>
						)
					:( 
						<>
						<h1>{props.myuser} Performance</h1>
						<p>No tasks!</p>
						</>
						)
				}
				</div>
				)
		}
		</>
		)
}

const mapStateToProps = (state)=> {
	console.log(state);
	return {
		tasks: state.tasks,
		users: state.users,
		Auth: state.auth
	}
};

export default connect(mapStateToProps,{listask})(Dashboard);
