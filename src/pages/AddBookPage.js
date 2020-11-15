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
		ISBN: '',
		genre: '',
		photo: {}
	}

	const [bookInfo, setBookInfo] = useState(initialBookInfo);
	console.log('auth.userId', auth.userId);
	console.log('bookInfo', bookInfo);
	const { id  } = useParams();
	console.log('id', id);

	useEffect(() => {
		if(id) {
			const fetchData = async (id) => {
				const data = await getBookInfo(id);
				setBookInfo({
					...data,
					ISBN: data.ISBN || ''
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
			form.append('isbn', bookInfo.ISBN);
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

	const updateHandler = async (e) => {
		e.preventDefault();
		console.log('update', id);
		try {
			const form = new FormData();
			form.append('title', bookInfo.title);
			form.append('author', bookInfo.author);
			bookInfo.ISBN && form.append('isbn', bookInfo.ISBN);
			form.append('genre', bookInfo.genre);
			if(bookInfo.photo) form.append('photo', bookInfo.photo);
			const res = await fetch(`http://localhost:5000/api/books/${id}`,{
				method: 'PUT',
				headers: { 
					'Authorization': auth.token
				},
				body: form
			});
			const data = await res.json();
			console.log('data', data);
			if(res.ok) {
				history.push('/');
			}
			} catch (err) {
				console.log('err', err);
			}
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
				value={bookInfo.ISBN}
				onChangeHandler={(e) => {
					setBookInfo({ ...bookInfo, ISBN: e.target.value })
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
					setBookInfo({ ...bookInfo, genre: e.target.value });
				}}
				/>
				{!id && <button type='submit'>Add book</button>}
				{id && <button type="button" onClick = { (e) => updateHandler(e) }>Update book</button>}
			</form>
		</div>
	)
}

export default AddBookPage;
