import React from "react";
import axios from "axios";
import FriendsList from "./componets/FriendsList";
import FriendForm from "./componets/FriendForm";
import "./App.css";
import { Route, withRouter, NavLink } from "react-router-dom";
import Home from "./componets/Home";

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		friends: [],
		error: "",
		activeFriend: null
	};
	componentDidMount() {
		axios
			.get("http://localhost:5000/friends")
			.then(res => this.setState({ friends: res.data }))
			.catch(err => this.setState({ error: err }));
	}

	addFriend = (e, friend) => {
		e.preventDefault();
		axios
			.post("http://localhost:5000/friends", friend)
			.then(res => this.setState({ friends: res.data }))
			.catch(err => console.log(err));
	};

	updateFriend = (e, friend) => {
		e.preventDefault();
		axios
			.put(`http://localhost:5000/friends/${friend.id}`, friend)
			.then(res => this.setState({ friends: res.data }))
			.catch(err => console.log(err));
	};

	deleteFriend = (e, id) => {
		e.preventDefault();
		axios
			.delete(`http://localhost:5000/friends/${id}`)
			.then(res => this.setState({ friends: res.data }))
			.catch(err => console.log(err));
	};

	setUpdateForm = (e, friend) => {
		e.preventDefault();
		this.setState({ activeFriend: friend });
	};
	render() {
		return (
			<div className="App">
				<Route exact path="/" component={Home} />
				<Route
					exact
					path={"/friends-list"}
					render={props => (
						<>
							<FriendForm
								addFriend={this.addFriend}
								updateFriend={this.updateFriend}
								activeFriend={this.state.activeFriend}
							/>
							<FriendsList
								{...props}
								setUpdateForm={this.setUpdateForm}
								deleteFriend={this.deleteFriend}
								friends={this.state.friends}
							/>
						</>
					)}
				/>
			</div>
		);
	}
}

export default withRouter(App);
