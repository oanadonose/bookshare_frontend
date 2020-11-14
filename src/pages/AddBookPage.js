import { React, useState } from 'react';
import Input from '../components/Input';
import styles from './Forms.module.scss';
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
			console.log('res', res);
		} catch (err) {
			console.log('err', err)
			return err;
		}
	}
	const [bookInfo, setBookInfo] = useState(initialBookInfo);
	console.log('bookInfo', bookInfo)
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
				<button type='submit'>Add book</button>
			</form>
		</div>
	)
}

export default AddBookPage;
