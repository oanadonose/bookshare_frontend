import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Book.module.scss';

const Book = (props) => {
	return (
		<div className={styles['book-card']} onClick={props.onClick}>
			<img src={props.photo}></img>
			<Link to={`/users/${props.user}`}>User</Link>
			<h4>by {props.author}</h4>
			<h2>{props.title}</h2>			
		</div>
	)
}
export default Book;