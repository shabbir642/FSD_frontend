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
            from: '',
            to: '',
            status: '',
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
        this.setState({ [name]: value });
    }
    login = async (event) => {
        this.setState({ submitted: true });
        event.preventDefault();
        // console.log("here");
        console.log(this.state);
        let data = {
            title: this.state.title === "" ? undefined : this.state.title,
            description: this.state.description === "" ? undefined : this.state.description,
            assignee: this.state.assignee === "" ? undefined: this.state.assignee,
            from: this.state.from === "" ? undefined: this.state.from,
            to: this.state.to === "" ? undefined: this.state.to,
            status: this.state.status === "" ? undefined: this.state.status,
        };
        // console.log(this.state.from);
        axios.post(`http://localhost:8000/api/filtertask`, data ,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((response) => {
            console.log(response);
            this.props.listask(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    render() {
        const { users, title, description, assignee, status, from, to} = this.state;
        return (
            <>
            <div className="row">
            <div className="col">
              <input type="text" id="title" value={title} name="title" placeholder="Search by Title" onChange={(e) => {this.inputchange(e)}} />
            </div>
            {this.props.Auth.admin? (
            <div className="col">
              <select name="assignee" value={assignee} onChange={(e) => {this.inputchange(e)}}>
              <option value="null"> Assignee </option>
              {users.map((user)=>
                <option key={user.id}>{user.id}</option>
                )}
              </select>
              {/*<input type="text"  id="assignee" placeholder="Assignee" onChange={(e) => {this.inputchange(e)}}/>*/}
            </div>)
            : " "}
             <div className="col">
               <select name="status" value={status} onChange={(e) => {this.inputchange(e)}}>
                <option value="Status">Status</option>
                <option value="Assigned">Assigned</option>
                <option value="In-progress">In-progress</option>
                <option value="Completed">Completed</option>
                </select>
            </div>
            <div className="col">
              <label>From</label>
              <input type="date"  id="from" value={from} name="from" onChange={(e) => {this.inputchange(e)}}/>
            </div>
            <div className="col">
              <label>To</label>
              <input type="date"  id="to" value={to} name="to" placeholder="to" onChange={(e) => {this.inputchange(e)}}/>
            </div>
            <div className="col">
            <button type="submit" className="btn btn-primary" onClick={this.login}>Submit</button>
            </div>
            </div>
            </>
            );
    }
}

const mapStateToProps = (state,ownProps) => {
    // console.log(ownProps);
    return {
        task: state.tasks,
        Auth: state.auth.loggeduser
    }
}
export default connect(mapStateToProps, { listask })(Searchtask);
