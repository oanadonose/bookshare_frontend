import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Book.module.scss';

const Book = (props) => {
	return (
		<div className={styles['book-card']} onClick={props.onClick}>
			<img src='https://elyssarpress.com/wp-content/uploads/2019/12/book-cover-placeholder.png'></img>
			<h3>{props.title}</h3>
			<h4>{props.author}</h4>
			<Link to={`/users/${props.user}`}>User</Link>
		</div>
	)
}
export default Book;