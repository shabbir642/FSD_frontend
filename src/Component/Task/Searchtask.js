import React, { Component, useContext } from "react";
import { BrowserRouter as Router, withRouter, Switch, Route, Link } from "react-router-dom";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { connect } from 'react-redux';
import { listask } from '../../Actions/Action';
class Searchtask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            assignee: '',
            deadline: '',
            status: '',
            submitted: false,
            users:[]
        }
    }
    componentDidMount(){
        axios.get(`http://localhost:8000/api/list`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((response) => {
            this.setState({users: response.data});
        })
    }
    inputchange = (event) => {
        const { name, value } = event.target;
        console.log('here');
        this.setState({ [name]: value });
    }
    login = async (event) => {
        this.setState({ submitted: true });
        event.preventDefault();
        // console.log("here");
        console.log(this.state.status);
        axios.post("http://localhost:8000/api/filtertask", {
            title: this.state.title,
            description: this.state.description,
            assignee: this.state.assignee,
            deadline: this.state.deadline,
            status: this.state.status
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }

        })
        .then((response) => {
            console.log(response);
            this.props.listask(response.data);
            this.props.history.push('/Tasklist');
            console.log("Shabbir hussain");
        }).catch((error) => {
            console.log(error);
        });
    }
    render() {
        const { users, title, description, assignee, status, deadline, submitted } = this.state;
        return (
            <>
            <div className="row">
            <div className="col">
              <label>Title</label>
              <input type="text" id="title" value={title} name="title" placeholder="Search by Title" onChange={(e) => {this.inputchange(e)}} />
            </div>
            {this.props.Auth.admin? (
            <div className="col">
              <label>Assignee</label>
              <select name="assignee" value={assignee} onChange={(e) => {this.inputchange(e)}}>
              {users.map((user)=>
                <option key={user.id}>{user.id}</option>
                )}
              </select>
              {/*<input type="text"  id="assignee" placeholder="Assignee" onChange={(e) => {this.inputchange(e)}}/>*/}
            </div>)
            : " "}
             <div className="col">
              <label>Status</label>
               <select name="status" value={status} onChange={(e) => {this.inputchange(e)}}>
                <option value="Assigned">Assigned</option>
                <option value="In-progress">In-progress</option>
                <option value="Completed">Completed</option>
                </select>
            </div>
             <div className="col">
              <label>Deadline</label>
              <input type="date"  id="deadline" value={deadline} name="deadline" placeholder="Deadline" onChange={(e) => {this.inputchange(e)}}/>
            </div>
            <div className="col">
            <button type="submit" className="btn btn-primary" onClick={this.login}>Submit</button>
            </div>
            </div>
            </>
            );
    }
}

const mapStateToProps = (state) => {
    return {
        task: state.tasks,
        Auth: state.auth.loggeduser
    }
}
export default connect(mapStateToProps, { listask })(Searchtask);
// disabled={!(email.length && description.length)}