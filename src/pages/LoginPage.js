import React from 'react';
import styles from './Forms.module.scss';


const LoginPage = () => {
	return (
		<div className={styles['form-group']}>
			<h2>Login</h2>
			<form className={styles['form']}>
				<label htmlFor="email">Email</label>	
				<input type="text" id="email"></input>
				<label htmlFor='password'>Password</label> 
				<input type="password" id='password'></input>
				<button type="submit">Login</button>
			</form>
		</div>
	)
}

export default LoginPage;
