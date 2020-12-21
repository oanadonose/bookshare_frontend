import { React } from 'react';
import { useHistory } from 'react-router-dom';

const ErrorPage = () => {

	let history = useHistory();

	return (
		<div>
			<h3>{history.location.state} ERROR</h3>
		</div>
	);
}

export default ErrorPage;