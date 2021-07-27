import React, { Component } from "react";
import axios from "axios";
import './style.css';
import Sideheader from "./Sideheader";
export default class Getdata extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:8000/api/list')
      .then(res => {
        const posts = res.data.map(obj => ({name: obj.username, email: obj.email}));
        this.setState({ posts });
      });
  }
    // ondelete = async (id) => {
  ondelete(){
      axios.get('http://localhost:8000/api/delete').then((response) => {
        console.log(response);
        alert(response);
      }).catch((error) => {
        alert(error);
      });
    }
	render() {
		return (
      <>
      <Sideheader />
      <div className="container">
      <div className="box">
       <div className="box-cell box1"> <Sideheader/> </div>
       <div className="box-cell box2">
			<ul>
        {this.state.posts.map(function(post, index){
          return (
              <div key={index}>
               <div className='row'>
                <div className="col-sm-4"> Name: {post.name} </div>
                <div className="col-sm-4"> Email: {post.email}</div>
                <div className="col-sm-4">
                 <button type="submit" className="btn btn-primary btn-sm">Delete</button> 
                 </div>
              </div>
              </div>
            )
          }
        )}
      </ul>
      </div>
      </div>
      </div> 
      </>
		)

	}
}
