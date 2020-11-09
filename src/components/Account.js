import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import styles from './Account.module.scss';

const Account = (props) => {
	const isLoggedIn = props.isLoggedIn;
	if(isLoggedIn=='true') {
		return (
			<div className={styles['loggedin']}>	
				<a href='/'>My books</a>
				<a href='/logout'>Logout</a>
			</div>
		)
	}
	else {
		return (
			<div className={styles['guest']}>
				<a href='/register'>Register</a>
				<a href='/login'>Login</a>
			</div>
		)
	}
}
export default Account;