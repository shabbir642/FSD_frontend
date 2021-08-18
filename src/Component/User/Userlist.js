import React, { Component } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import '../Support/style.css';
import Sideheader from "../Support/Sidebar";
import { listuser, deleteuser, makeadmin, removeadmin } from '../../Actions/Action';
import { Table } from 'react-bootstrap';
class Userlist extends Component {
	constructor(props) {
    super(props);
    this.state = {
      keyword:''
    }
  }
  componentDidMount() {
    axios.get('http://localhost:8000/api/list',{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(response => {
      this.props.listuser(response.data);
    }).catch((error) => {
      console.log(error);
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
    // window.location.reload();
  })
  .catch((error) => {
    alert(error);
  });
}

makeadmin = (id) => {
  axios.post(`http://localhost:8000/api/makeadmin`,{
    id: id
  },
  {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((response) => {
    console.log(response);
    this.props.makeadmin(id);
  }).catch((error) => {
    console.log(error);
  });
}
removeadmin = (id) => {
  axios.post(`http://localhost:8000/api/removeadmin`,{
    id: id
  },
  {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((response) => {
    console.log(response);
    this.props.removeadmin(id);
  }).catch((error) => {
    console.log(error);
  });
}

componentDidUpdate(){
  if(this.state.keyword === ""){
    axios.get('http://localhost:8000/api/list',{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(response => {
      this.props.listuser(response.data);
    }).catch((error) => {
      console.log(error);
    });
  } else {
    axios.get(`http://localhost:8000/api/filteruser/${this.state.keyword}`,{
     headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((response) => {
    this.props.listuser(response.data);
    console.log(response.data);
  }).catch((error) => {
    console.log(error);
  });
   // } 
 }
}

render() {
  return (
    <>
  <div className="container">
  <div className="box-cell box1"> <Sideheader/> </div>
  <div className="box-cell box2" style={{marginLeft:"100px", marginTop:"60px"}}>
  <div className="row">
  <div className="col">
  <input type="text" id="keyword" value={this.state.keyword} name="keyword" placeholder="Search by name or email" style={{width: "608px", marginLeft: "200px"}} onChange={(e) => {this.setState({keyword: e.target.value})}} />
  </div>
       {/* <div className="col">
        <button type="submit" className="btn btn-primary btn-sm" onClick = {this.finduser}>Search</button>
      </div>*/}
      </div>
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
        {this.props.users.users.map((post) => (
         <tr key = {post.id}>

         <td>{post.username}</td>
         <td>{post.email}</td>
         <td>
         <button type="submit" className="btn btn-primary btn-sm" onClick = {()=>this.ondelete(post.id)}>Delete</button> 
         </td>
         <td>
         {!post.admin ? <button type="submit" className="btn btn-primary btn-sm" onClick = {()=>this.makeadmin(post.id)}>Make admin</button>
          :
          <button type="submit" className="btn btn-primary btn-sm" onClick = {()=>this.removeadmin(post.id)}>Remove admin</button> 
         }
         </td>
         </tr>
         ))
      }
      </>
      ):(
      <> 
      { this.props.users.users.map((post,index) => (
       <tr key = {index}>

       <td>{post.username}</td>
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
    Auth: state.auth.loggeduser,
    users: state.users
  }
}
export default connect(mapStateToProps,{ listuser, deleteuser, makeadmin, removeadmin })(Userlist);
