import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './BookPage.module.scss';
import { useAuth } from '../context/auth';
const BookPage = (props) => {
	const auth = useAuth();
	
	const [bookInfo, setBookInfo] = useState(props.location.state.item) //get book info from redirect
	const [bookOwnerName, setBookOwnerName] = useState('');

	const getUserInfo = async (id) => {
		let userInfo='invalid user';
		const res = await fetch(`http://localhost:5000/api/users/${id}`, {
			headers: {
				"Authorization": auth.token
			},
		});
		if(res.ok) {
			userInfo = await res.json();
			setBookOwnerName(userInfo.name);
		}
		return userInfo;
	}

	getUserInfo(bookInfo.user);

	return (
		<div className={styles['book-page']}>
			<img src={`${bookInfo.photo}`}/>
			<div className={styles['info-panel']}>
				<h1>{bookInfo.title}</h1>
				<h2>{bookInfo.author}</h2>
				<p>ISBN: {bookInfo.ISBN}</p>
				<p>Genre: {bookInfo.genre}</p>
				<a href="/">{}</a>
				<Link to={`/users/${bookInfo.user}`}>{bookOwnerName}</Link>
			</div>
		</div>
	)
}

export default BookPage;
