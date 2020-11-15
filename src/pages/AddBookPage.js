import { React, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Input from '../components/Input';
import styles from './Forms.module.scss';
import history from '../history';
import { useAuth } from '../context/auth';
import bookGenres from '../helpers/bookGenres';

const AddBookPage = (props) => {

	const auth = useAuth();
	const [form, setForm] = useState(new FormData());
	
	const initialBookInfo = {
		title: '',
		author: '',
		isbn: '',
		genre: '',
		photo: {}
	}

	const [bookInfo, setBookInfo] = useState(initialBookInfo);
	console.log('auth.userId', auth.userId);
	console.log('bookInfo.user', bookInfo.user);
	const { id  } = useParams();
	console.log('id', id);

	useEffect(() => {
		if(id) {
			const fetchData = async (id) => {
				const data = await getBookInfo(id);
				setBookInfo({
					...data,
					isbn: data.isbn || ''
				});
			}
			fetchData(id);
		}
		return () => {
			setBookInfo(initialBookInfo);
		}
	}, [id]);
	

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

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const form = new FormData();
			form.append('title', bookInfo.title);
			form.append('author', bookInfo.author);
			form.append('isbn', bookInfo.isbn);
			form.append('genre', bookInfo.genre);
			form.append('photo', bookInfo.photo);
			for (let value of form.values()) {
				console.log(value); 
			 }
			const res = await fetch('http://localhost:5000/api/books/add', {
				method: 'POST',
				headers: {
					"Authorization": auth.token,
				},
				body: form
			});
			if(res.ok) {
				history.push('/');
			}
		} catch (err) {
			console.log('err', err)
			return err;
		}
	}

	const updateHandler = async () => {
		console.log('update', id);
	}
	return (
		<div className={styles['form-group']}>
			<form encType="multipart/form-data" onSubmit={(e) => submitHandler(e)} className={styles['form']}>
				<Input id='book-title'
				label='Title'
				type='text'
				required={true}
				value={bookInfo.title}
				onChangeHandler={(e) => {
					setBookInfo({ ...bookInfo, title: e.target.value })
				}}
				/>
				<Input id='book-author'
				label='Author'
				type='text'
				required={true}
				value={bookInfo.author}
				onChangeHandler={(e) => {
					setBookInfo({ ...bookInfo, author: e.target.value })
				}}
				/>
				<Input id='book-isbn'
				label='ISBN'
				type='text'
				required={false}
				value={bookInfo.isbn}
				onChangeHandler={(e) => {
					setBookInfo({ ...bookInfo, isbn: e.target.value })
				}}
				/>
				<Input id='book-photo'
				label='Photo'
				type='file'
				required={false}
				files={bookInfo.photo}
				onChangeHandler={(e) => {
					const file = e.target.files[0];
					form.append('photo', file);
					setBookInfo({ ...bookInfo, photo: file});			
				}}
				/>
				<Input id='book-genre'
				label='Genre'
				type='select'
				options={bookGenres}
				required={false}
				value={bookInfo.genre}
				onChangeHandler={(e) => {
					setBookInfo({ ...bookInfo, genre: e.target.value })
				}}
				/>
				{!id && <button type='submit'>Add book</button>}
				{id && <button onClick = { () => updateHandler()}>Update book</button>}
			</form>
		</div>
	)
}

export default AddBookPage;
