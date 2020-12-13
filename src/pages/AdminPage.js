import { React, useState, useEffect } from 'react';
import { useAuth } from '../context/auth.js';
import styles from './AdminPage.module.scss';

const AdminPage = () => {
	const auth = useAuth();

	const [users, setUsers] = useState([]);

	console.log('users', users);
	
	const getData = async () => {
		try {
			const res = await fetch('http://localhost:5000/api/users');
			const data = await res.json();
			return data;
		} catch(err) {
			console.log('err', err);
		}
	}
	const fetchData = async () => {
		const data = await getData();
		setUsers(data);
	}
	useEffect(() => {
		fetchData();
	},[]);

	return ( 
		<div className={styles['users-panel']}>
			<h1>Users</h1>
		</div>
	 )
}

export default AdminPage;