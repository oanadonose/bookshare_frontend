import React from 'react';
import styles from './Book.module.scss';
import PropTypes from 'prop-types';

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

Book.propTypes = {
	item: PropTypes.object,
	photo: PropTypes.string,
	onClick: PropTypes.func
}

export default Book;