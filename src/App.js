import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
	return (
		<BrowserRouter>
			<div className="App">
				<Header></Header>
				<Route path="/" exact component={HomePage}></Route>
				<Route path="/login" exact component={LoginPage}></Route>
				<Route path="/register" exact component={RegisterPage}></Route>
			</div>
		</BrowserRouter>
	);
}

export default App;
