import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import history from '../history.js';
import Account from './Account.js';
import Input from './Input.js';
import styles from './Header.module.scss';
import { AuthContext, useAuth } from '../context/auth';

const Header = (props) => {
	const auth = useAuth();
	console.log('auth.token', auth);

	const [searchQ, setSearchQ] = useState('');

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`http://localhost:5000/api/books/?search=${searchQ}`)
			const data = await res.json();
			auth.updateSearched(data);
			console.log('data', data);
		} catch (err) {
			console.log('err', err);
		}
	}

	const homeClickHandler = () => {
		auth.updateSearched('');
		setSearchQ('');
		history.push('/');
	}

	return (
		<div className={styles['header']}>
			<button type="button" className={styles['home-btn']} onClick={homeClickHandler}>Home</button>
			<div className={styles['search']}>
				<Input type='text' className={styles['search-input']}
					name='search' 
					placeholder='Search . . . . . '
					value={searchQ}
					onChangeHandler={(e) => {
						setSearchQ(e.target.value)
					}} 
					></Input>
				<button type='button' onClick={submitHandler} className={styles["search-btn"]}>Search</button>
			</div>
			<AuthContext.Consumer>
				{value => <Account className={styles['account-bar']} isLoggedIn={auth.token}/>}
			</AuthContext.Consumer>
		</div>
	)
}

export default Header;
