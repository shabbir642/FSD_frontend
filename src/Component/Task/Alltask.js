import React from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import Sideheader from "../Support/Sidebar";
export default class Alltask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
    }
    componentDidMount() {
        axios.get('http://localhost:8000/api/listask',{
            headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(res => {
            // console.log(JSON.parse(localStorage.getItem("user")).id);
            this.setState({
                tasks: res.data
            });
        }).catch((error) => {
            console.log(error);
        })
    }
    render() {
        return (
            <div className="container">
             < div className="box-cell box1"> <Sideheader/> </div>
              <div className="box-cell box2">
               <Link to="/Createtask">Add Task</Link>
				<ul>
					{this.state.tasks.map((task) => {
						return (
							<div key = {task.id}>
								 <div className='row'>
                                       <div className="col-sm-4"> Title: {task.title} </div>
                                       <div className="col-sm-4"> Description: {task.description}</div>
                                        <div className="col-sm-4"> Assignor: {task.assignor} </div>
                                        <div className="col-sm-4"> Deadline: {task.deadline} </div>
                                        <div className="col-sm-4"> Status: {task.status} </div>
                                 </div>
							</div>
							)
					})
				}
				</ul>
			</div>
            </div>
        )
    }
}