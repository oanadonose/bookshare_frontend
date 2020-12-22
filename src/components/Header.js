import React, { useState, useEffect } from 'react';
import history from '../history.js';
import Account from './Account.js';
import Input from './Input.js';
import styles from './Header.module.scss';
import { AuthContext, useAuth } from '../context/auth';

const Header = () => {
	const auth = useAuth();

	const [searchQ, setSearchQ] = useState('');
	const [showNav, setShowNav] = useState(window.innerWidth>800 ? true:false);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`http://localhost:5000/api/books/?search=${searchQ}`)
			const data = await res.json();
			auth.updateSearched(data);
		} catch (err) {
			console.log('err', err);
		}
	}

	//for persistent context for auth - local storage keeps data on refresh but context doesn't
	useEffect(() => {
		if(!auth.token && localStorage.token) {
			auth.updateToken(localStorage.token);
		}
		if(!auth.userId && localStorage.userid) {
			auth.updateUserId(localStorage.userid);
		}
	}, [auth, auth.token]);

	const homeClickHandler = () => {
		auth.updateSearched('');
		setSearchQ('');
		history.push('/');
	}

	return (
		<div className={styles['header']}>
			<button type="button" className={styles['home-btn']} onClick={homeClickHandler}>Home</button>
			<button type="button" className={styles['navbar-btn']} 
				onClick={() => setShowNav(!showNav)}>{showNav ? 'Close':'Menu'}</button>
			<div className={`${styles['navbar']} ${showNav ? '':styles['navbar--hide']}`}>
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
					{value => <Account showToggle={showNav} isLoggedIn={auth.token}/>}
				</AuthContext.Consumer>
			</div>
		</div>
	)
}

export default Header;
