import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import LoginPage from '../pages/LoginPage';
import styles from './Account.module.scss';

const Account = (props) => {
	
	const auth = useAuth();
	console.log('props.isLoggedIn', props.isLoggedIn)

	const clickHandler = async () => {
		const res = await fetch('http://localhost:5000/api/users/logout', { 
			method: 'POST',
			headers: { 
				'Authorization': auth.token
			}
		});
		localStorage.removeItem('token');
		localStorage.removeItem('userid');
		auth.updateToken('');
		auth.updateUserId('');
		console.log('res', res);		
	}
	if(props.isLoggedIn) {
		return (
			<div className={styles['loggedin']}>	
				<Link to='/book/add'>Add book</Link>
				<Link to={`/user/${auth.userId}`}>My profile</Link>
				<button className={styles['logout']} onClick={clickHandler}>Logout</button>
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