import {React, useState} from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from './context/auth';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import BookPage from './pages/BookPage';
import AddBookPage from './pages/AddBookPage';
import RequestPage from './pages/RequestPage';
import AdminPage from './pages/AdminPage';
import ErrorPage from './pages/ErrorPage';
import history from './history';

const App = () => {

	const [token, setToken] = useState('');
	const [userId, setUserId] = useState('');
	const [searched, setSearched] = useState([]);
	

	const updateToken = (value) => {
		setToken(value);
	}
	const updateUserId = (value) => {
		setUserId(value);
	}

	const updateSearched = (value) => {
		setSearched(value);
	}

	return (
		//todo: try move authcontext only to wrap what is needed cuz of performance drain 
		// #Global shared state with context @ https://blog.logrocket.com/a-deep-dive-into-react-context-api/

		<AuthContext.Provider value={{token, updateToken, userId, updateUserId, searched, updateSearched}}>
			<Router history={history} forceRefresh={true}>
				<div className="App">
					<Header></Header>
					<Switch>
						<Route path="/" exact component={HomePage}></Route>
						<Route path="/error" exact component={ErrorPage}></Route>
						<Route path="/login" exact component={LoginPage}></Route>
						<Route path="/register" exact component={RegisterPage}></Route>
						<Route path="/books/:id" exact children={<BookPage/>}></Route>
						<Route path="/user/:id" exact children={<UserPage/>}></Route>
						<Route path="/request/:id" exact children={<RequestPage/>}></Route>
						<PrivateRoute path="/test" exact component={AdminPage}></PrivateRoute>
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
