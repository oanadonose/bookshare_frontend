import React from 'react';
import Account from './Account.js';
import styles from './Header.module.scss';

const Header = (props) => {
	return (
		<div className={styles['header']}>
			<a href='/'>Home</a>
			<input className={styles['search-bar']} type='search' placeholder='Search . . . . '></input>
			<Account className={styles['account-bar']} isLoggedIn='false'/>
		</div>
	)
}

export default Header;
