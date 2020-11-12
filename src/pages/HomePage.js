import { React, useState, useEffect } from 'react';
import Book from '../components/Book';
import styles from './HomePage.module.scss';
import history from '../history';

const HomePage = () => {
	
	const [books, setBooks] = useState([]);

	console.log('books', books);
	const getData = async () => {
		try {
			const res = await fetch('http://localhost:5000/api/books');
			const data = await res.json();
			return data
		} catch(err) {
			console.log('err', err)
		}
	}
	useEffect(() => {
		const fetchData = async () => {
			const data = await getData();
			setBooks(data);
		}
		fetchData();
	},[]);

	const clickHandler = (id) => {
		history.push(`/books/${id}`);
	}

	console.log(books);

	return (
		<div className={styles['home-feed']}>
			{books.map(item => (
				<Book key={item.id} title={item.title} author={item.author} user={item.user} onClick={() => clickHandler(item.id)}/>
			))}
		</div>
	)
}

export default HomePage;
