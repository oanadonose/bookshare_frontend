import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Book.module.scss';

const Book = (props) => {
	const bookData = props.item;
	return (
		<div className={styles['book-card']} onClick={props.onClick}>
			<img src={props.photo}></img>
			<h4>by {bookData.author}</h4>
			<h2>{bookData.title}</h2>			
		</div>
	)
}
export default Book;