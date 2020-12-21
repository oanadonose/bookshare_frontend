import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import styles from './Account.module.scss';
import PropTypes from 'prop-types';

const Account = (props) => {
	
	const auth = useAuth();

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

Account.propTypes = {
	isLoggedIn: PropTypes.string
}
export default Account;