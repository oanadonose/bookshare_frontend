import React from 'react'
import Account from './Account.js'

export default function Header(props) {
	return (
		<div className="header">
			<a href="/">Home</a>
			<input className="search-bar" type="search" placeholder="Search . . . . "></input>
			<Account className="account-bar" isLoggedIn="true"/>
		</div>
	)
}
