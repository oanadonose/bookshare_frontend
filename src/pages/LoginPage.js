import { React, useState } from 'react';
import {useAuth} from '../context/auth';
import Input from '../components/Input';
import styles from './Forms.module.scss';
import history from '../history';



const LoginPage = () => {
	const auth = useAuth();
	const [creds, setCreds] = useState({
		email: '',
		password: ''
	});

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch('http://localhost:5000/api/users/login', {
				method: 'POST',
				headers: {
					"Content-Type": 'application/json'
				},
				body: JSON.stringify(creds)
			});
			const data = await res.json();
			if(data.success) {
				localStorage.setItem('token', data.token);
				auth.updateToken(data.token);
				localStorage.setItem('userid', data.userid);
				auth.updateUserId(data.userid);
			}
			history.push('/');
			return data
		} catch(err) {
			console.log('err', err);
			history.push('/500');
		}
	}

	console.log('creds', creds)
	return (
		<div className={styles['form-group']}>
			<h2>Login</h2>
			<form onSubmit={(e) => submitHandler(e)} className={styles['form']}>
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
