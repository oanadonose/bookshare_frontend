import { React, useState } from 'react';
import Input from '../components/Input';
import styles from './Forms.module.scss';
import history from '../history';


const RegisterPage = () => {
	const [creds, setCreds] = useState({
		name: '',
		email: '',
		password: ''
	});

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			await fetch('http://localhost:5000/api/users/register', {
				method: 'POST',
				headers: {
					"Content-Type": 'application/json',
				},
				body: JSON.stringify(creds)
			});
			//console.log('res', res)
			//const data = await res.json();
			history.push('/login');
			//return data
			//return res
		} catch(err) {
			console.log('err', err);
			history.push('/500');
		}
	}

	return (
		<div className={styles['form-group']}>
			<h2>Register</h2>
			<form onSubmit={(e) => submitHandler(e)} className={styles['form']}>
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

				<button >Register</button>
			</form>
		</div>
	)
}

export default RegisterPage;
