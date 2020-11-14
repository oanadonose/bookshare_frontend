import { React, useState } from 'react';
import Input from '../components/Input';
import styles from './Forms.module.scss';
import { useAuth } from '../context/auth';

const AddBookPage = (props) => {
	const [form, setForm] = useState(new FormData());
	const auth = useAuth();
	const bookGenres = [
		{ value: 'biography',
		  text: 'Biography'
		},
		{ value: 'crime',
		  text: 'Crime'
		},
		{ value: 'fiction',
		  text: 'Fiction'
		},
		{ value: 'history',
		  text: 'History'
		},
		{ value: 'poetry',
		  text: 'Poetry'
		},
		{ value: 'romance',
		  text: 'Romance'
		},
		{ value: 'science fiction',
		  text: 'Science fiction'
		},
		{ value: 'thriller',
		  text: 'Thriller'
		},
		{ value: 'horror',
		  text: 'Horror'
		},
		{ value: 'fantasy',
		  text: 'Fantasy'
		},
	];
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
			console.log('res', res)
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
					console.log('file', file);
					form.append('photo', file);
					setBookInfo({ ...bookInfo, photo: file});
					console.log('bookInfo', bookInfo);
					
					for (let value of form.values()) {
						console.log(value, 'value'); 
					}

					//const param = e.target.files[0];
					//let reader = new FileReader();
					//reader.readAsDataURL(param);
					//console.log('reader', reader);
					//let reslog = '';
					//reader.onload = (e) => {
					//	console.log('reader.result', reader.result);
					//	console.log('reader.result.type', typeof(reader.result));
					//	reslog = reader.result;
					//	setBookInfo({ ...bookInfo, photo: reslog, photoType: param.type});
					//}
					
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
