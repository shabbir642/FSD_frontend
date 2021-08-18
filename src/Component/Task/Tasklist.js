import React from 'react'
import axios from "axios";
import { connect } from 'react-redux';
import Sideheader from "../Support/Sidebar";
import Navbar from "../Support/Navbar";
import { Table } from 'react-bootstrap';
import Searchtask from './Searchtask';
import Updatetask from './Updatetask';
import { listask, deletetask } from '../../Actions/Action';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
class Tasklist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            status: '',
        };
    }
    componentDidMount() {
        // console.log(this.props.Auth.id);
        axios.post('http://localhost:8000/api/mytask', {
            id: this.props.Auth.id
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
        }).then(res => {
            // this.setState({
            //     tasks: res.data
            // });
            console.log(res);
            this.props.listask(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }
    ondelete = (id) => {
        axios.get(`http://localhost:8000/api/deletetask/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((response) => {
            console.log(response);
            this.props.deletetask(id);
        }).catch((error) => {
            console.log(error);
        });
    }
    statuschange = (event) => {
        console.log(event.target.value);
        axios.post(`http://localhost:8000/api/updatestatus`, {
            id: event.target.name,
            status: event.target.value
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((response) => {
            console.log(response);
            this.setState({
            status: event.target.value
          });
        }).catch((error) => {
            console.log(error);
        });
    }
    formattime = (newdate) => {
        if(newdate){
        var date = new Date(newdate);
        var options = {
           hour: 'numeric',
           minute: 'numeric',
           hour12: true
       };
       var timeString = date.toLocaleString('en-US', options);
        var onlydate = newdate.split(' ')[0];
        return onlydate + ',' + timeString;
      }
   }
    render() {
        return (
            <div>
            <Sideheader/> 
            <div className = "box-cell box2" style={{marginLeft: "165px", marginTop:"65px", marginRight:"10px"}}>
            <Searchtask />
             { /*<button type="submit" className="btn btn-primary" onClick = {Createtask}>Add new task</button>*/ }
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
    {this.props.tasks.tasks.map((task) => (
       <tr key = {task.id}>

       <td>{task.title}</td>
       <td>{task.description}</td>
       <td>{task.assignor}</td>
       <td>{task.assignee}</td>
       <td>{this.formattime(task.deadline)}</td>
       <td>
       {this.props.Auth.id === task.assignee ? 
       (<select className="form-control mb-3" name={task.id} defaultValue={task.status} onChange={this.statuschange}>

       <option value="Assigned">Assigned</option>
       <option value="In-progress">In-progress</option>
       <option value="Completed">Completed</option>

       </select>)

       : task.status }
       </td>
       <td>
       {this.props.Auth.id === task.assignor ?
       <button type="Submit" className="btn btn-primary" onClick = {()=>this.ondelete(task.id)}>Delete</button>
       : " "
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
        Auth: state.auth.loggeduser,
        tasks:state.tasks
    }
}
export default connect(mapStateToProps, { listask, deletetask })(Tasklist);
