import { React, useState, useEffect } from 'react';
import Book from '../components/Book';
import styles from './HomePage.module.scss';

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

	console.log(books);

	return (
		<div className={styles['home-feed']}>
			{books.map(item => (
				<Book title={item.title} author={item.author} user={item.user}/>
			))}
		</div>
	)
}

export default HomePage;
