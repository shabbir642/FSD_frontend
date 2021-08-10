import React from 'react'
import Sideheader from "./Support/Sidebar";
import Userpage from './Userpage';
import Navbar from "./Support/Navbar";

export default class Welcome extends React.Component {
	render() {
		return (
			<div className="row">
			    <Navbar/>
				<Sideheader />
				<Userpage />
			</div>
		)
	}
}