import { React, useState } from 'react';
import Input from '../components/Input';
import styles from './Forms.module.scss';


const LoginPage = () => {
	const [creds, setCreds] = useState({
		email: '',
		password: ''
	});

	console.log('creds', creds)
	return (
		<div className={styles['form-group']}>
			<h2>Login</h2>
			<form className={styles['form']}>
				<Input 
					id='login-email'
					label='Email'
					type='email'
					required={true}
					value={creds.email}
					onChangeHandler={(e) => {
						setCreds({ ...creds, email: e.target.value })
					}}
				/>
				<Input 
					id='login-password'
					label='Password'
					type='password'
					required={true}
					value={creds.password}
					onChangeHandler={(e) => {
						setCreds({ ...creds, password: e.target.value })
					}}
				/>

				<button type="submit">Login</button>
			</form>
		</div>
	)
}

export default LoginPage;
