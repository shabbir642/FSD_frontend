import React, { Component } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import '../Support/style.css';
import Sideheader from "../Support/Sidebar";
import { listuser, deleteuser } from '../../Actions/Action';
import { Table } from 'react-bootstrap';
class Userlist extends Component {
	constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
    // ondelete = props;
  }
  componentDidMount() {
    axios.get('http://localhost:8000/api/list',{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(response => {
        this.setState({ posts: response.data});
        this.props.listuser(response.data);
      });
  }
 ondelete = async(id) => {
  // console.log(event);
      axios.delete(`http://localhost:8000/api/delete/${id}`,{
            headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
        console.log(response);
        this.props.deleteuser(id);
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
    }


	render() {
		return (
      <>
      {/*<Sideheader />*/}
      <div className="container">
       <div className="box-cell box1"> <Sideheader/> </div>
       <div className="box-cell box2">
			  <Table striped bordered hover size="sm">
                              <thead>
                                 <tr>
                                  <th>Name</th>
                                  <th>Email</th>
                                  <th>Options</th>
                               </tr>
                             </thead>
                                <tbody>
                                {this.props.Auth.admin ? (
                                    <>
                                     {this.state.posts.map((post) => (
                                                 <tr key = {post.id}>
             
                                                <td>{post.name}</td>
                                                <td>{post.email}</td>
                                                <td>
                                                <button type="submit" className="btn btn-primary btn-sm" onClick = {()=>this.ondelete(post.id)}>Delete</button> 
                                                </td>
                                               {/* <td>
                                                <button type="submit" className="btn btn-primary btn-sm" onClick = {()=>this.viewtask(post.id)}>Mytask</button> 
                                                </td>*/}
                                             </tr>
                                          ))
                                   }
                                   </>
                                   ):(
                                   <> 
                                    { this.state.posts.map((post,index) => (
                                                 <tr key = {index}>
             
                                                <td>{post.name}</td>
                                                <td>{post.email}</td>
              
                            
                                             </tr>
                                          ))
                                   }
                                   </>
                                   )
                                 }
                                 </tbody>
                              </Table>
      </div>
      </div> 
      </>
		)

	}
}
const mapStateToProps = (state) => {
  console.log(state)
  return{
    Auth: state.auth.loggeduser
  }
}
export default connect(mapStateToProps,{ listuser, deleteuser})(Userlist);
