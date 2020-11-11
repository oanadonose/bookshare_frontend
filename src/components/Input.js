import { React, useState } from 'react';

const Input = (props) => {
	return (
		<>
			<label htmlFor={props.id}>{props.label}</label>	
				<input
					onChange={props.onChangeHandler}
					value={props.value}
					type={props.type}
					required={props.required}
					id={props.id}/>
		</>
	)
}

export default Input;