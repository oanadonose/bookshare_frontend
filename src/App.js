import React from 'react';
import { Router, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from './context/auth';
import './App.scss';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import history from './history';

const App = () => {
	

	return (
		<AuthContext.Provider value="false">
			<Router history={history}>
				<div className="App">
					<Header></Header>
					<Route path="/" exact component={HomePage}></Route>
					<Route path="/login" exact component={LoginPage}></Route>
					<Route path="/register" exact component={RegisterPage}></Route>
				</div>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
