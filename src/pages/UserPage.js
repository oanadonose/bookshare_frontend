import { React, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/auth';
import Book from '../components/Book';
import styles from './HomePage.module.scss';
import history from '../history';

const UserPage = () => {

	const auth = useAuth();

	const [userInfo, setUserInfo] = useState({
		name: '',
		email: '',
		address: ''
	});
	const [userBooks, setUserBooks] = useState([]);
	console.log('userInfo', userInfo);
	console.log('userBooks', userBooks);

	const { id } = useParams();

	
	const fetchBooks = async (userid) => {
		const res = await fetch(`http://localhost:5000/api/users/${userid}/books`);
		const data = await res.json();
		console.log('data', data);
		return data;
	}
	const fetchUserInfo = async (id) => {
		const res = await fetch(`http://localhost:5000/api/users/${id}`);
		console.log(`http://localhost:5000/api/users/${id}`);
		const data = await res.json();
		console.log('data', data);
		return data;
	}

	const clickHandler = (item) => {
		console.log('item', item);
		history.push(`/books/${item._id}`);
	}
	const fetchUserBooks = async (userid) => {
		const userBooks = await fetchBooks(userid);
		setUserBooks(userBooks);
	}
	const fetchData = async (userid) => {
		const res = await fetchUserInfo(userid);
		setUserInfo({name: res.name, email: res.email, address: res.address});
	}

	useEffect(() => {
		fetchData(id);	
		fetchUserBooks(id);
	}, []);

	return (
		<div className={styles['home-feed']}>
			<div className={styles['info-panel']}>
				<h2>Username: {userInfo.name}</h2>
				<h2>Email: {userInfo.email}</h2>
				{auth.userId === id && <h3>Address: {userInfo.address}</h3>}
				<div className={styles['owner-actions']}>
					<Link to={`/user/${id}/edit`}>Update user details</Link>
				</div>
			</div>
			{userBooks.map(item => (
				<Book item={item}
				key={item._id}
				photo={`data:${item.photo.contentType};base64,${item.photo.data}`} 
				onClick={() => clickHandler(item)}/>
			))}
		</div>
	)
}

export default UserPage;
