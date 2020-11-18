import { React, useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './BookPage.module.scss';
import history from '../history';
import { useAuth } from '../context/auth';
import { placeholder } from '../helpers/bookPhotoPlaceholder';
const BookPage = (props) => {
	const auth = useAuth();
	const initialBookInfo = {
		title: '',
		author: '',
		isbn: '',
		genre: '',
		user: '',
		requests: [],
		photo: {
			data: '',
			contentType: ''
		}
	}
	const [bookInfo, setBookInfo] = useState(initialBookInfo);
	console.log('auth.userId', auth.userId);
	console.log('bookInfo.user', bookInfo.user);
	const { id  } = useParams();
	console.log('id', id);
	

	const getBookInfo = async (id) => {
		const res = await fetch(`http://localhost:5000/api/books/${id}`, {
			headers: {
				"Authorization": auth.token
			},
		});
		
		if(res.ok) {
			const bookData = await res.json();
			return bookData;
		}		
	}

	const deleteHandler = async () => {
		console.log('delete ');
		const res = await fetch(`http://localhost:5000/api/books/${id}`, {
			method: 'DELETE',
			headers: { 
				'Authorization': auth.token
			}
		 });
		const data = await res.json();
		console.log('data', data);
		if(data.success) {
			history.push('/');
		}
	}


	useEffect(() => {
		const fetchData = async (id) => {
			const data = await getBookInfo(id);
			setBookInfo(data);
		}
		fetchData(id);
	}, []);

	return (
		<>
			<div className={styles['book-page']}>
				<img alt='book-cover' src={`data:${bookInfo.photo.contentType ? bookInfo.photo.contentType : 'image/png'};base64,${bookInfo.photo.data ? bookInfo.photo.data : placeholder}`}/>
				<div className={styles['info-panel']}>
					<h1>{bookInfo.title}</h1>
					<h2>{bookInfo.author}</h2>
					<p>ISBN: {bookInfo.ISBN}</p>
					<p>Genre: {bookInfo.genre}</p>
					<Link to={`/user/${bookInfo.user._id}`}>Owner</Link>
					{auth.userId === bookInfo.user && <div className={styles['owner-actions']}>
						<button onClick={() => deleteHandler()}>Delete book</button>
						<Link to={`/book/add/${id}`}>Update book</Link>
					</div>}
				</div>
			</div>
			<div className={styles['requests']}>
				<h2>Requests: </h2>
				
				{bookInfo.requests.map(request => {
					const header = (
						<div id={`request-${request._id}`} key={`request-${request._id}`} className={styles['request-bubble']}>
							<p>{request._id}</p>
						</div>
					);
					const messages = request.messages.map(message => {
						return <p>{message.text}</p>
					});
					return (
						<div>
							{header}
							{messages}
						</div>
					);
					})
				}
			</div>
		</>
	)
}

export default BookPage;
