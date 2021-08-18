import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Pusher from 'pusher-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Createtask from '../Task/Createtask';
class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      notif:'',
      show: false
    }
  }

  componentDidMount(){
    var pusher = new Pusher('7d82ae87dd330b6cf2d9', {
      cluster: 'ap2'
    });
    var channel = pusher.subscribe('my-channel');
    channel.bind('createtask', (data) => {
      console.log(JSON.stringify(data));
      this.setState({notif:JSON.stringify(data)});
    });
    channel.bind('statusupdate', (data) => {
      console.log(JSON.stringify(data));
      this.setState({notif:JSON.stringify(data)});
    });
  }
  handleopen = () => {
    this.setState({show: true});
  }
  handleclose = () => {
    this.setState({show: false});
  }
  render() {
    return (
      <>
    {/*<div className="auth-wrapper">*/}
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
    <div className="container">
    <Link className="navbar-brand" to={"/Navbar"}>Vmock Task Manager</Link>
    { !this.props.Auth.isloggedin ? (
      <ul className="navbar-nav ms-auto">
      <li className="nav-item">
      <Link className="nav-link" to={"/login"}>Login</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to={"/signup"}>Sign up</Link>
      </li> 
      </ul>
      ) : (
      <ul className="navbar-nav ms-auto">
      <li className="nav-item">
     <Button variant="primary" onClick={this.handleopen}>
        Add Task
      </Button>

      <Modal animation={false} show={this.state.show} onHide={this.handleclose}>
        <Modal.Body>< Createtask /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleclose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to={"/logout"}>Logout</Link>
      </li>
      </ul>
      ) 
    }
    </div>
    <div>
    <button onClick={() => toast(this.state.notif)}>
    Notify!
    </button>
    <ToastContainer position="top-center"/>
    </div>
    </nav>
    </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    Auth: state.auth
  }
}

export default connect(mapStateToProps)(Navbar);
