import React, { Component, useContext } from "react";
import { BrowserRouter as Router, withRouter, Switch, Route, Link} from "react-router-dom";
import axios from "axios";
import { connect } from 'react-redux';
import { addtask } from '../../Actions/Action';
export class Createtask extends Component {
     constructor (props){
        super(props);
        this.state = {
            title:'',
            description:'',
            assignee:'',
            deadline:'',
            status:'',
            errors: {
                title:'Enter Title',
                description:'Write some description',
                assignee:'Assign someone',
                deadline:'Any'
            },
            submitted:false,
        }
    }
   inputchange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]:value});
        this.checkerror(event);
    }
    checkerror = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name){
            case 'title': 
             errors.tile = value.length < 1 ? errors.title : '';
             break;
            case 'description':
            errors.description = value.length < 1 ? errors.description : '';
            break;
            case 'assignee':
            errors.assignee = value.length < 1 ? errors.assignee : '';
            break;
            // case 'deadline':
            // errors.deadline = Validdate(value) ? '':'Wrong date format: set as YY-MM-D';
        default:
         break;
        }
        this.setState({ errors });
    }
     login = async (event) => {
        this.setState({ submitted : true });
        event.preventDefault();
         axios.post("http://localhost:8000/api/createtask", {
           title: this.state.title,
           description: this.state.description,
           assignee: this.state.assignee,
           deadline: this.state.deadline
        },{
            headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }

        })
        .then((response) => {
            console.log(response);
                this.props.addtask(response.data);
                this.props.history.push('/Welcome');
                console.log("Shabbir hussain");
         }).catch((error) => {
         	console.log(error);
         });
    }
    render() {
        const { title, description, assignee, status, deadline, errors, submitted} = this.state;
        return (
            <>
            <div className="auth-wrapper">
            <div className="auth-inner">
                <h3>New Task</h3>
               <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={title} name = "title" id = "title" className="form-control" placeholder="Enter title" onChange ={(e) => {this.inputchange(e)}} />
                    {submitted && errors.title.length > 0 && <span className='error'>{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input type="text" value={description} name = "description" id = "description" className="form-control" placeholder="Enter description" onChange ={(e) => {this.inputchange(e) }} />
                    {submitted && errors.description.length > 0 && <span className='error'>{errors.description}</span>}
                </div> 
                 <div className="form-group">
                    <label>Assignee</label>
                    <input type="text" value={assignee} name = "assignee" id = "assignee" className="form-control" placeholder="Enter assignee" onChange ={(e) => {this.inputchange(e) }} />
                    {submitted && errors.assignee.length > 0 && <span className='error'>{errors.assignee}</span>}
                </div> 
                <div className="form-group">
                    <label>Deadline</label>
                    <input type="date" value={deadline} name = "deadline" id = "deadline" className="form-control" placeholder="YY-MM-DD" onChange ={(e) => {this.inputchange(e) }} />
                </div>
                <button type="submit" className="btn btn-primary" onClick = {this.login}>Submit</button>
          </div>
          </div>
          </>
       
        );
    }
}

const mapStateToProps = (state) => {
    return{
        task: state.tasks

    }
}
export default connect(mapStateToProps, {addtask})(Createtask);
// disabled={!(email.length && description.length)} 