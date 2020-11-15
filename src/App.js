import {React, useState} from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { AuthContext, useAuth } from './context/auth';
import './App.scss';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import BookPage from './pages/BookPage';
import AddBookPage from './pages/AddBookPage';
import history from './history';

const App = () => {

	const [token, setToken] = useState(localStorage.getItem('token')||'');
	const [userId, setUserId] = useState(localStorage.getItem('userid')||'');
	console.log('userid', userId);
	const updateToken = (value) => {
		setToken(value);
	}
	const updateUserId = (value) => {
		setUserId(value);
	}

	return (
		<AuthContext.Provider value={{token, updateToken, userId, updateUserId}}>
			<Router history={history}>
				<div className="App">
					<Header></Header>
					<Switch>
						<Route path="/" exact component={HomePage}></Route>
						<Route path="/login" exact component={LoginPage}></Route>
						<Route path="/register" exact component={RegisterPage}></Route>
						<Route path="/books/:id" exact children={<BookPage/>}></Route>
						<Route path="/user/:id" exact children={<UserPage/>}></Route>
						<PrivateRoute path="/user/:id/edit" exact children={<RegisterPage/>}></PrivateRoute>
						<PrivateRoute path="/book/add" exact component={AddBookPage}></PrivateRoute>
						<PrivateRoute path="/book/add/:id" exact component={AddBookPage}></PrivateRoute>
					</Switch>
				</div>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
