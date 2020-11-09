import React from 'react';
import styles from './Forms.module.scss';


const RegisterPage = () => {
	return (
		<div className={styles['form-group']}>
			<h2>Register</h2>
			<form className={styles['form']}>
				<label htmlFor="name">Name</label>	
				<input type="text" id="name"></input>
				<label htmlFor="email">Email</label>	
				<input type="email" id="email"></input>
				<label htmlFor='password'>Password</label> 
				<input type="password" id='password'></input>
				<button type="submit">Register</button>
			</form>
		</div>
	)
}

export default RegisterPage;
