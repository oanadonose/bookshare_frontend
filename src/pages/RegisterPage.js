import { React, useState } from 'react';
import Input from '../components/Input';
import styles from './Forms.module.scss';


const RegisterPage = () => {
	const [creds, setCreds] = useState({
		name: '',
		email: '',
		password: ''
	});

	console.log('creds', creds)
	return (
		<div className={styles['form-group']}>
			<h2>Register</h2>
			<form className={styles['form']}>
				<Input 
					id='register-name'
					label='Name'
					type='text'
					required={true}
					value={creds.name}
					onChangeHandler={(e) => {
						setCreds({ ...creds, name: e.target.value })
					}}
				/>
				<Input 
					id='register-email'
					label='Email'
					type='email'
					required={true}
					value={creds.email}
					onChangeHandler={(e) => {
						setCreds({ ...creds, email: e.target.value })
					}}
				/>
				<Input 
					id='register-password'
					label='Password'
					type='password'
					required={true}
					value={creds.password}
					onChangeHandler={(e) => {
						setCreds({ ...creds, password: e.target.value })
					}}
				/>

				<button type='submit'>Register</button>
			</form>
		</div>
	)
}

export default RegisterPage;
