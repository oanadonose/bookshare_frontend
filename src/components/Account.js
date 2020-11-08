import React from 'react'

export default function Account(props) {
	const isLoggedIn = props.isLoggedIn;
	if(isLoggedIn) {
		return (
			<div className="loggedin">	
				<a href="/">My books</a>
				<a href="/logout">Logout</a>
			</div>
		)
		}
	else {
		return (
			<div className="guest">
				<a href="/register">Register</a>
				<a href="/login">Login</a>
			</div>
		)
	}
}
