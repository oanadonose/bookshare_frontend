import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/auth';
import Input from '../components/Input';
import styles from './Forms.module.scss';
import history from '../history';


const RegisterPage = () => {
	const { id } = useParams();
	const auth = useAuth();

	const initialUserInfo = {
		name: '',
		email: '',
		password: '',
		address: ''
	};

	const [creds, setCreds] = useState(initialUserInfo);

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
	const updateHandler = async (e) => {
		e.preventDefault();
		console.log('update', id);
		console.log('creds', creds);
		if(!creds.password) delete creds.password;
		console.log('creds', creds);
		try {
			const res = await fetch(`http://localhost:5000/api/users/${id}`,{
				method: 'PUT',
				headers: { 
					'Authorization': auth.token,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(creds)
				});
			const data = await res.json();
			console.log('data', data);
			if(res.ok) {
				//history.push('/');
			}
	 	} catch (err) {
			console.log('err', err);
		}
	}
	const getUserInfo = async (id) => {
		const res = await fetch(`http://localhost:5000/api/users/${id}`, {
			headers: {
				"Authorization": auth.token
			},
		});
		console.log('res', res);
		if(res.ok) {
			const userData = await res.json();
			console.log('userData', userData);
			return userData;
		}		
	}

	useEffect(() => {
		if(id) {
			const fetchData = async (id) => {
				const data = await getUserInfo(id);
				setCreds({
					name: data.name,
					email: data.email,
					address: data.address || ''
				});
			}
			fetchData(id);
		}
		return () => {
			setCreds(initialUserInfo);
		}
	}, [id]);

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
				<Input 
					id='register-address'
					label='Address'
					type='text'
					required={false}
					value={creds.address}
					onChangeHandler={(e) => {
						setCreds({ ...creds, address: e.target.value })
					}}
				/>

				{!id && <button type="submit">Register</button>}
				{id && <button type="button" onClick={(e) => updateHandler(e)}>Update user</button>}
			</form>
		</div>
	)
}

export default RegisterPage;
