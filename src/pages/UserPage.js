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
	console.log(userBooks, 'userBooks');
	const initialRequestData = {
		archived: false,
		messages: [],
		status: '',
		user: '',
		_id: '',
		book: {}
	}
	const [userMadeRequests, setUserMadeRequests] = useState([]);
	const [userReceivedRequests, setUserReceivedRequests] = useState([]);

	const { id } = useParams();

	
	const fetchBooks = async (userid) => {
		const res = await fetch(`http://localhost:5000/api/users/${userid}/books`);
		const data = await res.json();
		return data;
	}
	const fetchUserInfo = async (id) => {
		const res = await fetch(`http://localhost:5000/api/users/${id}`);
		const data = await res.json();
		return data;
	}

	const fetchUserMadeRequests = async (id) => {
		const res = await fetch(`http://localhost:5000/api/requests/${id}/made`, {
			headers: { 'Authorization': auth.token }
		});
		const data = await res.json();
		console.log('data', data);
		return data;
	}
	const fetchUserReceivedRequests = async (id) => {
		const res = await fetch(`http://localhost:5000/api/requests/${id}/received`, {
			headers: { 'Authorization': auth.token }
		});
		const data = await res.json();
		return data;
	}


	const fetchUserBooks = async (userid) => {
		const userBooks = await fetchBooks(userid);
		setUserBooks(userBooks);
	}
	const fetchData = async (userid) => {
		const res = await fetchUserInfo(userid);
		setUserInfo({name: res.name, email: res.email, address: res.address});
		const madeRequestsData = await fetchUserMadeRequests(userid);
		console.log('made', madeRequestsData)
		setUserMadeRequests(madeRequestsData);
		const receivedRequestsData = await fetchUserReceivedRequests(userid);
		console.log('received', receivedRequestsData);
		setUserReceivedRequests(receivedRequestsData);
	}

	useEffect(() => {
		fetchData(id);	
		fetchUserBooks(id);
	}, []);

	const clickHandler = (item) => {
		history.push(`/books/${item._id}`);
	}

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
			<div className={styles['books-panel']}>
				{userBooks.map(item => (
					<Book item={item}
					key={item._id}
					photo={`data:${item.photo.contentType};base64,${item.photo.data}`} 
					onClick={() => clickHandler(item)}/>
				))}
			</div>
			{auth.userId===id && (
				<div className={styles['requests-panel']}>
					<h3>Requests Made</h3>
					{userMadeRequests.map(request => {
						console.log('request', request);
						return (
						<div key={request._id}>
							<a href={`../request/${request._id}`}>[{request.status}] for {request.book.title}</a>
						</div>
					)})}
					<h3>Requests Received</h3>
					{userReceivedRequests.map(request => (
						<div key={request._id}>
							<a href={`../request/${request._id}`}>[{request.status}] by {request.user.name}</a>
						</div>
					))}
				</div>
			)}
			
		</div>
	)
}

export default UserPage;
