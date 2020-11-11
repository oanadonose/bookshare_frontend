import React from 'react';
import { Link } from 'react-router-dom';
import Account from './Account.js';
import styles from './Header.module.scss';

const Header = (props) => {
	return (
		<div className={styles['header']}>
			<Link to='/'>Home</Link>
			<input className={styles['search-bar']} type='search' placeholder='Search . . . . '></input>
			<Account className={styles['account-bar']} isLoggedIn='false'/>
		</div>
	)
}

export default Header;
