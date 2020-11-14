import { React, useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './BookPage.module.scss';
import { useAuth } from '../context/auth';
const BookPage = (props) => {
	const auth = useAuth();
	const initialBookInfo = {
		title: '',
		author: '',
		isbn: '',
		genre: '',
		photo: {
			data: '',
			contentType: ''
		}
	}
	const [bookInfo, setBookInfo] = useState(initialBookInfo);
	const { id  } = useParams();
	console.log('id', id);
	

	const getBookInfo = async (id) => {
		const res = await fetch(`http://localhost:5000/api/books/${id}`, {
			headers: {
				"Authorization": auth.token
			},
		});
		console.log('res', res)
		if(res.ok) {
			const bookData = await res.json();
			return bookData;
		}		
	}

	useEffect(() => {
		const fetchData = async (id) => {
			const data = await getBookInfo(id);
			setBookInfo(data);
		}
		fetchData(id);
	}, [id]);

	return (
		<div className={styles['book-page']}>
			<img src={`data:${bookInfo.photo.contentType};base64,${bookInfo.photo.data}`}/>
			<div className={styles['info-panel']}>
				<h1>{bookInfo.title}</h1>
				<h2>{bookInfo.author}</h2>
				<p>ISBN: {bookInfo.ISBN}</p>
				<p>Genre: {bookInfo.genre}</p>
			</div>
		</div>
	)
}

export default BookPage;
