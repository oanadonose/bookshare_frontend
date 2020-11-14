import React from 'react';
import { Link } from 'react-router-dom';
import Account from './Account.js';
import styles from './Header.module.scss';
import { useAuth } from '../context/auth';

const Header = (props) => {
	const auth = useAuth();
	return (
		<div className={styles['header']}>
			<Link to='/'>Home</Link>
			<input className={styles['search-bar']} type='search' placeholder='Search . . . . '></input>
			{auth.token ? (<Account className={styles['account-bar']} isLoggedIn='false'/>) : <h2>LOGIN!</h2>}
		</div>
	)
}

export default Header;
