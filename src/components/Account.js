import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import styles from './Account.module.scss';

const Account = (props) => {
	const isLoggedIn = props.isLoggedIn;
	if(isLoggedIn=='true') {
		return (
			<div className={styles['loggedin']}>	
				<Link to='/'>My books</Link>
				<Link to='/logout'>Logout</Link>
			</div>
		)
	}
	else {
		return (
			<div className={styles['guest']}>
				<Link to='/register'>Register</Link>
				<Link to='/login'>Login</Link>
			</div>
		)
	}
}
export default Account;