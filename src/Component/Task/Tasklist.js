import React from 'react'
import axios from "axios";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Sideheader from "../Support/Sidebar";
import { Table, Modal, Button, ButtonToolbar } from 'react-bootstrap';
import Createtask from './Createtask';
import Searchtask from './Searchtask';
import { listask, deletetask } from '../../Actions/Action';
import Navbar from '../Support/Navbar'
class Tasklist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            status: '',
        };
    }
    componentDidMount() {
        axios.post('http://localhost:8000/api/mytask', {
            id: this.props.Auth.id
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
        }).then(res => {
            this.setState({
                tasks: res.data
            });
            this.props.listask(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }
    ondelete = async (id) => {
        axios.get(`http://localhost:8000/api/deletetask/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((response) => {
            console.log(response);
            this.props.deletetask(id);
            window.location.reload();
            alert("Task deleted");
        }).catch((error) => {
            console.log(error);
            alert(error);
        });
    }
    statuschange = async (id) => {
        axios.post(`http://localhost:8000/api/updatestatus`, {
            id: id,
            status: this.state.status
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((response) => {
            console.log(response);
            //need redux //
            alert("Status change");
            window.location.reload();
        }).catch((error) => {
            console.log(error);
            alert(error);
        });
    }
    render() {
        return (
            <div>
            
            <div className="box-cell box1"> 
            <Sideheader/> 
            </div>
            <div className = "box-cell box2" >
            <Searchtask />
            <Link to="/Createtask">Add Task</Link> { /*<button type="submit" className="btn btn-primary" onClick = {Createtask}>Add new task</button>*/ }
            <Table striped bordered hover size="sm">
    <thead>
    <tr>
    <th>Title</th>
    <th>Description</th>
    <th>Assignor</th>
    <th>Assignee</th>
    <th>Deadline</th>
    <th>Status</th>
    <th>Options</th>
    </tr>
    </thead>
    <tbody>
    {this.state.tasks.map((task) => (
       <tr key = {task.id}>

       <td>{task.title}</td>
       <td>{task.description}</td>
       <td>{task.assignor}</td>
       <td>{task.assignee}</td>
       <td>{task.deadline}</td>
       <td>{task.status}</td>
       <td>
       {this.props.Auth.id == task.assignee ? 
       (<select className="form-control mb-3" defaultValue={task.status} onChange={(e) => this.setState({status: e.target.value})}>

       <option value="Assigned">Assigned</option>
       <option value="In-progress">In-progress</option>
       <option value="Completed">Completed</option>

       </select>)

       : " "}
       {this.props.Auth.id == task.assignor ? 
       <button type="Submit" className="btn btn-primary" onClick = {()=>this.ondelete(task.id)}>Delete</button>: " "
   }
   </td>
   </tr>
   ))}

    </tbody>
    </Table> 
    </div> 
    </div> 
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        Auth: state.auth.loggeduser
    }
}
export default connect(mapStateToProps, { listask, deletetask })(Tasklist);
// <button type="Submit" className="btn btn-primary" onClick = {()=>this.statuschange(task.id)}>Change Status</button>