import React from 'react'

export default class getdata extends React.Component {
	state = {
		loading: true
		// person: null
	};
	async componentDidMount(){
		const url = "http://localhost:8000/api/me";
		const response = await fetch(url);
		const data = await response.json();
		// this.setState({person: data.})
	}
	render() {
		return (
			<div>
				{this.state.loading ? <div>loading..</div> : <div>person..</div>}
			</div>
		)
	}
}