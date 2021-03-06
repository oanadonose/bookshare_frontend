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

	const [userMadeRequests, setUserMadeRequests] = useState([]);
	const [userReceivedRequests, setUserReceivedRequests] = useState([]);

	const { id } = useParams();

	
	const fetchBooks = async (userid) => {
		const res = await fetch(`http://localhost:5000/api/users/${userid}/books`, {
			headers: {'Authorization': auth.token || localStorage.token }
		});
		const data = await res.json();
		return data;
	}
	const fetchUserInfo = async (id) => {
		const res = await fetch(`http://localhost:5000/api/users/${id}`, {
			headers: { 
				'Authorization': auth.token || localStorage.token
			}
		});
		const data = await res.json();
		return data;
	}

	const fetchUserMadeRequests = async (id) => {
		const res = await fetch(`http://localhost:5000/api/requests/${id}/made`, {
			headers: { 'Authorization': auth.token || localStorage.token }
		});
		const data = await res.json();
		return data;
	}
	const fetchUserReceivedRequests = async (id) => {
		const res = await fetch(`http://localhost:5000/api/requests/${id}/received`, {
			headers: { 'Authorization': auth.token || localStorage.token }
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
		setUserMadeRequests(madeRequestsData);
		const receivedRequestsData = await fetchUserReceivedRequests(userid);
		setUserReceivedRequests(receivedRequestsData);
	}

	useEffect(() => {
		fetchData(id);	
		fetchUserBooks(id);
	}, [auth.token]);

	const clickHandler = (item) => {
		history.push(`/books/${item._id}`);
	}

	return (
		<div className={styles['home-feed']}>
			<div className={styles['left-side']}>
				<div className={styles['info-panel']}>
					<h2>Username: {userInfo.name}</h2>
					<h2>Email: {userInfo.email}</h2>
					{auth.userId === id && <>
						<h3>Address: {userInfo.address}</h3>
						<div className={styles['owner-actions']}>
							<Link to={`/user/${id}/edit`}>Update user details</Link>
						</div>
					</>
					}
				</div>
				{auth.userId===id && (
					<div className={styles['requests-panel']}>
						<h3>Requests Made</h3>
						{userMadeRequests && userMadeRequests.map(request => {
							console.log('request', request);
							return (
							<div key={request._id}>
								<a href={`../request/${request._id}`}>[{request.status}] for {request.book.title}</a>
							</div>
						)})}
						<h3>Requests Received</h3>
						{userReceivedRequests && userReceivedRequests.map(request => (
							<div key={request._id}>
								<a href={`../request/${request._id}`}>[{request.status}] by {request.user.name}</a>
							</div>
						))}
					</div>
				)}
			</div>
			
			<div className={styles['books-panel']}>
				{userBooks.map(item => (
					<Book item={item}
					key={item._id}
					photo={`data:${item.photo.contentType};base64,${item.photo.data}`} 
					onClick={() => clickHandler(item)}/>
				))}
			</div>
			
			
		</div>
	)
}

export default UserPage;
