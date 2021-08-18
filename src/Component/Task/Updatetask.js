import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { connect } from 'react-redux';
import { updatetask } from '../../Actions/Action';
class Updatetask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            assignee: '',
            deadline:'',
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
            id: this.props.id,
            title: this.state.title === "" ? undefined : this.state.title,
            description: this.state.description === "" ? undefined : this.state.description,
            assignee: this.state.assignee === "" ? undefined: this.state.assignee,
            deadline: this.state.from === "" ? undefined: this.state.from,
        };
        // console.log(this.state.from);
        axios.post(`http://localhost:8000/api/updatetask`, data ,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((response) => {
            console.log(response);
            this.props.updatetask(response.data);
            // this.props.history.push('/Tasklist');
        }).catch((error) => {
            console.log(error);
        });
    }
    render() {
        const { users, title, description, assignee, status, deadline} = this.state;
        return (
            <div className="auth-inner">
            <h3>Update task details</h3>
            <div className="form-group">
            <label>Change title</label>
              <input type="text" id="title" value={title} name="title" placeholder="title" onChange={(e) => {this.inputchange(e)}} />
            </div>
            <div className="form-group">
            <label>Change Description</label>
              <input type="text" id="description" value={description} name="description" placeholder="Description" onChange={(e) => {this.inputchange(e)}} />
            </div>
            <div className="form-group">
            <label>Change assignee</label>
              <select name="assignee" value={assignee} onChange={(e) => {this.inputchange(e)}}>
              <option value="null"> Assignee </option>
              {users.map((user)=>
                <option key={user.id}>{user.id}</option>
                )}
              </select>
            </div>
            <div className="form-group">
              <label>Change Deadline</label>
              <input type="date"  id="deadline" value={deadline} name="deadline" onChange={(e) => {this.inputchange(e)}}/>
            </div>
            <div className="form-group">
            <button type="submit" className="btn btn-primary" onClick={this.login}>Update</button>
            </div>
            </div>
            );
    }
}

const mapStateToProps = (state,ownProps) => {
    // console.log(ownProps);
    return {
        Auth: state.auth.loggeduser
    }
}
export default connect(mapStateToProps, { updatetask })(Updatetask);
// disabled={!(email.length && description.length)}