import React from 'react';
import { Link } from 'react-router-dom';
import Account from './Account.js';
import styles from './Header.module.scss';
import { AuthContext, useAuth } from '../context/auth';

const Header = (props) => {
	const auth = useAuth();
	console.log('auth.token', auth);
	return (
		<div className={styles['header']}>
			<Link to='/'>Home</Link>
			<input className={styles['search-bar']} type='search' placeholder='Search . . . . '></input>
			<AuthContext.Consumer>
				{value => <Account className={styles['account-bar']} isLoggedIn={auth.token}/>}
			</AuthContext.Consumer>
		</div>
	)
}

export default Header;
