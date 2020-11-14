import { React, useState } from 'react';

const Input = (props) => {


	return (
		<>
			<label htmlFor={props.id}>{props.label}</label>	
				{props.type === 'select' && 
					<select id={props.id} name={props.label} onChange={props.onChangeHandler} value={props.value}>
						<option key={'null-value'} value=''>Select genre</option>
						{props.options.map((option, index) => <option key={`select-${option.text}-${index}`} value={option.value}>{option.text}</option>)}
					</select>
				}

				{props.type !== 'select' && props.type !== 'file' &&
					<input
					onChange={props.onChangeHandler}
					value={props.value}
					type={props.type}
					required={props.required}
					id={props.id}/>
				}
				{props.type === 'file' &&
					<input
					onChange={props.onChangeHandler}
					value={props.value}
					type={props.type}
					name={props.type}
					required={props.required}
					id={props.id}/>
				}
				
		</>
	)
}

export default Input;