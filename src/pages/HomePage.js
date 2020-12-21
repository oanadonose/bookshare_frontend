import { React, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Book from '../components/Book';
import { useAuth } from '../context/auth.js';
import styles from './HomePage.module.scss';
//import history from '../history';

const HomePage = () => {
	let history = useHistory();
	const auth = useAuth();
	const apiUrl = 'http://localhost:5000/api';
	const [books, setBooks] = useState([]);
//'http://localhost:5000/api/books'
	console.log('books', books);
	
	const fetchData = async () => {
		const getData = async () => {
			try {
				const res = await fetch(`${apiUrl}/books`);
				if(res.ok) {
					const data = await res.json();
					return data;
				}
				else {
					throw new Error(res.status)
				}	
			} catch(err) {
				history.push({pathname: '/error', state:err.message});
			}
		}
		const data = await getData();
		setBooks(data);
	}
	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);


	useEffect(() => {
		if(auth.searched==='') {
			fetchData();
		}
		else {
			setBooks(auth.searched);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth.searched]);

	const clickHandler = (item) => {
		console.log('item', item);
		history.push(`/books/${item._id}`);
	}

	console.log(books);

	return (
		<div className={styles['home-feed']}>
			{books && books.map(item => (
				<Book item={item}
				key={item._id}
				photo={`data:${item.photo.contentType};base64,${item.photo.data}`} 
				onClick={() => clickHandler(item)}/>
			))}
		</div>
	)
}

export default HomePage;
