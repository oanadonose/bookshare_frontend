import { React, useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './RequestPage.module.scss';
import { useAuth } from '../context/auth';
import Input from '../components/Input';
import { placeholder } from '../helpers/bookPhotoPlaceholder';

const RequestPage = (props) => {
	const auth = useAuth();
	console.log('auth.userId', auth.userId);
	
	const { id  } = useParams();
	console.log('id', id);
	const initialRequestData = {
		_id: '',
		messages: [],
		archived: false,
		book: {
			_id: '',
			title: '',
			author: '',
			isbn: '',
			genre: '',
			user: {
				_id: '',
				name: '',
			},
			photo: {
				data: '',
				contentType: ''
			}
		},
		user: {},
		status: ''
	};
	const initialRequest = {
		message: '',
		status: ''
	}

	const [requestData, setRequestData] = useState(initialRequestData);
	const [request, setRequest] = useState(initialRequest);
	const [didAction, setDidAction] = useState(false);
	console.log(didAction);
	

	const fetchRequest = async (requestId) => {
		const res = await fetch(`http://localhost:5000/api/requests/${requestId}`, {
			headers: { 
				'Authorization': auth.token
			}
		});
		if(res.ok) {
			const data= await res.json();
			console.log('data', data);
			return data;
		}
	}

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			console.log('before fetch = ' , request.message);
			const body= JSON.stringify({
				requestId: id,
				message: request.message
			});
			const res = await fetch(`http://localhost:5000/api/requests/reply`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': auth.token
				},
				body
			});
			const data = await res.json();
			console.log(data);
			setRequestData(data);
			return data;
		} catch (err) {
			console.log('err', err);
		}
	}
 
	useEffect(() => {
		const fetchData = async (requestId) => {
			const data = await fetchRequest(requestId);
			setRequestData(data);
		}
		fetchData(id);
	}, []);

	const cancelHandler = async () => {
		const body= JSON.stringify({
			requestId: id,
		});
		try {
			const res = await fetch(`http://localhost:5000/api/requests/close`, {
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
	};
	const archiveHandler = async () => {
		try {
			const res = await fetch(`http://localhost:5000/api/requests/${id}/archive`, {
				method: 'POST',
				headers: { 
					'Authorization': auth.token
				}
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
	const acceptHandler = async () => {
	}
	return (
		<div className={styles['request-page']}>
			<div className={styles['book-info']}>
				<a href={`../books/${requestData.book._id}`}><h1>{requestData.book.title}</h1></a>
				<h2>{requestData.book.author}</h2>
				<p>ISBN: {requestData.book.ISBN}</p>
				<p>Genre: {requestData.book.genre}</p>
				<Link to={`/user/${requestData.book.user}`}>Owner</Link>
				<img alt='book-cover' src={`data:${requestData.book.photo.contentType ? requestData.book.photo.contentType : 'image/png'};base64,${requestData.book.photo.data ? requestData.book.photo.data : placeholder}`}/>
			</div>
			<div className={styles['request-panel']}>
				<div className={styles['']}>
					<div className={styles['actions']}>
						<h2><Link to={`/user/${requestData.user._id}`}>{requestData.user.name}</Link> requested this book.</h2>
						{auth.userId===requestData.user._id && !requestData.archived &&
							<button onClick={() => cancelHandler()}>Cancel</button>
						}
						{auth.userId===requestData.book.user._id && !requestData.archived &&
							<div>
								<button onClick={() => archiveHandler()}>Archive</button>
								<button onClick={() => acceptHandler()}>Accept</button>
							</div>
						}
					</div>
					<p>request status: {requestData.status}</p>
					{requestData.archived && <p>Archived</p>}
					{requestData.status === 'open' &&  !requestData.archived &&
					<form onSubmit={(e) => submitHandler(e)} className={styles['reply-form']}>
						<Input id='message'
						type='text'
						label='Message'
						required='true'
						value={request.message}
						onChangeHandler={(e) => {
							setRequest({ ...request, message: e.target.value })
						}}
						/>
						<button type='submit'>Reply</button>						
					</form> 
					}
				</div>
				<div className={styles['messages-panel']}>
					{requestData.messages.map((message) => {
						return (
							<div className={styles['message-bubble']}>
								<h4 className={styles['name']}>{message.user.name}</h4>
								<p>{message.text}</p>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	);
}

export default RequestPage;