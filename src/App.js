import {React, useState} from 'react';
import { Router, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from './context/auth';
import './App.scss';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import BookPage from './pages/BookPage';
import history from './history';

const App = () => {

	const [token, setToken] = useState(localStorage.getItem('token')||'');

	return (
		<AuthContext.Provider value={{token}}>
			<Router history={history}>
				<div className="App">
					<Header></Header>
					<Route path="/" exact component={HomePage}></Route>
					<Route path="/login" exact component={LoginPage}></Route>
					<Route path="/register" exact component={RegisterPage}></Route>
					<Route path="/books/:id" exact component={BookPage}></Route>
					<PrivateRoute path="/private" exact component={UserPage}></PrivateRoute>
				</div>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
