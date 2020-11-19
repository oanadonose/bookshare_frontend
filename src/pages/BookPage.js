import { React, useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './BookPage.module.scss';
import history from '../history';
import { useAuth } from '../context/auth';
import { placeholder } from '../helpers/bookPhotoPlaceholder';
import Input from '../components/Input';

const BookPage = (props) => {
	const auth = useAuth();
	const initialBookInfo = {
		title: '',
		author: '',
		isbn: '',
		genre: '',
		user: '',
		status: '',
		requests: [],
		photo: {
			data: '',
			contentType: ''
		}
	};
	const initialRequest = {
		message: ''
	};
	const [request, setRequest] = useState(initialRequest);
	const [bookInfo, setBookInfo] = useState(initialBookInfo);

	const { id  } = useParams();
	console.log('bookInfo', bookInfo)

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

	const submitHandler = async (e) => {
		e.preventDefault();
		const body = JSON.stringify({
			bookId: id,
			message: request.message
		});

		try {
			const res = await fetch(`http://localhost:5000/api/requests/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': auth.token
				},
				body
			});
			const data = await res.json();
			if(data.success) {
				console.log(data);
			}
			return data;
		} catch (err) {
			console.log('err', err);
		}
	}

	const loanHandler = async () => {
		const form = new FormData();
		form.append('status', 'on loan');
		try {
			const res = await fetch(`http://localhost:5000/api/books/${id}`, {
				method: 'PUT',
				headers: { 
					'Authorization': auth.token
				},
				body: form
			});
		} catch (err) {
			console.log('err', err);
		}
	}
	const availableHandler = async () => {
		const form = new FormData();
		form.append('status', 'available');
		try {
			const res = await fetch(`http://localhost:5000/api/books/${id}`, {
				method: 'PUT',
				headers: { 
					'Authorization': auth.token
				},
				body: form
			});
		} catch (err) {
			console.log('err', err);
		}
	}

	return (
		<>
			<div className={styles['book-page']}>
				<img alt='book-cover' src={`data:${bookInfo.photo.contentType ? bookInfo.photo.contentType : 'image/png'};base64,${bookInfo.photo.data ? bookInfo.photo.data : placeholder}`}/>
				<div className={styles['info-panel']}>
					<h1>{bookInfo.title}</h1>
					<h2>{bookInfo.author}</h2>
					<p>ISBN: {bookInfo.ISBN}</p>
					<p>Genre: {bookInfo.genre}</p>
					<p>Status: {bookInfo.status}</p>
					<Link to={`/user/${bookInfo.user._id}`}>Owner</Link>
					{auth.userId === bookInfo.user._id && <div className={styles['owner-actions']}>
						<button onClick={() => deleteHandler()}>Delete book</button>
						<button><Link to={`/book/add/${id}`}>Update book</Link></button>
						{bookInfo.status!=='on loan' &&
							<button onClick={() => loanHandler()}>Mark as 'on loan'</button>
						}
						{bookInfo.status!=='available' && 
							<button onClick={() => availableHandler()}>Mark as 'available'</button>
						}
					</div>}
				</div>
			</div>
			{auth.userId===bookInfo.user._id &&
			<div>
				<div className={styles['actions']}>
					{bookInfo.status==='available' &&
					<form className={styles['add-request-form']} onSubmit={(e) => submitHandler(e)}>
						<Input id='message'
							type='text'
							label='Message'
							required={true}
							value={request.message}
							onChangeHandler={(e) => {
							setRequest({ ...request, message: e.target.value })
						}}/>
						<button type='submit'>Request book</button>
					</form>
					}
				</div>
				<div className={styles['requests']}>
					{bookInfo.requests.map(request => {
						return (
							<div key={request._id}>
								<Link to={`../request/${request._id}`}>{`${request.status} -requested by ${request.user.name} ${request.archived ? '(archived)': '' }`}</Link>
							</div>
						)
					})}
				</div>
			</div>
			}
		</>
	)
}

export default BookPage;
