import React from 'react'
import axios from "axios";
export default class Todaytask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: []
        };
    }
    componentDidMount() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd; 
        axios.get(`http://localhost:8000/api/taskfortoday/${today}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
        }).then(res => {
            // console.log(JSON.parse(localStorage.getItem("user")).id);
            this.setState({
                task: res.data
            });
        }).catch((error) => {
            console.log(error);
        })
    }

    formattime = (newdate) => {
        var date = new Date(newdate);
        var options = {
           hour: 'numeric',
           minute: 'numeric',
           hour12: true
       };
       var timeString = date.toLocaleString('en-US', options);
       return timeString;
   }

   render() {
    return (
       <>
       {this.state.task.length === 0 ?
         <div className="auth-inner">
         <h2>No task for today!</h2>
         </div>
         : " " }
         {this.state.task.map((task) => {
            return (
                <div key = {task.id}>
                <div className="row">
                <div className="col">{this.formattime(task.deadline)} </div>
                <div className="col"> {task.title} </div>
                <div className="col"> {task.description}</div>
                <div className="col">  {task.assignor} </div>
                <div className="col"> {task.status} </div>
                </div>
                </div>
                )
        })
     }
     </> 

     )
}
}