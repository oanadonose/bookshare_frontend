import { React } from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
 const label = (<label htmlFor={props.id}>{props.label}</label>);
	switch (props.type) {
		case 'select':
			return (
				<>
					{label}
					<select id={props.id} name={props.label} onChange={props.onChangeHandler} value={props.value}>
						<option key={'null-value'} value=''>Select genre</option>
						{props.options.map((option, index) => <option key={`select-${option.text}-${index}`} value={option.value}>{option.text}</option>)}
					</select>
				</>
			);
		case 'file':
			return (
				<>
					{label}
					<input
						onChange={props.onChangeHandler}
						value={props.value}
						type={props.type}
						name={props.type}
						required={props.required}
						id={props.id}/>
				</>
			);
		default:
			return (
				<>
					{label}
					<input
						onChange={props.onChangeHandler}
						value={props.value}
						type={props.type}
						required={props.required}
						id={props.id}/>
				</>
			)
	}
}

Input.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	type: PropTypes.string,
	required: PropTypes.bool,
	onChangeHandler: PropTypes.func,
	value: PropTypes.string
}

export default Input;