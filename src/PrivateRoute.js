import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const auth = useAuth();
	console.log('auth', auth.token)
	const foo = true;

	return (
		<Route {...rest} 
			render={props => auth.token ? (
				<Component {...props}/>
			) : (
				<Redirect to="/login"/>
			)}/>
	);
}

export default PrivateRoute;