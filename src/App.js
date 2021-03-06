import { unwrapResult } from '@reduxjs/toolkit';
import firebase from 'firebase';
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import productApi from './api/productApi';
import './App.scss';
import { getMe } from './app/userSlice';
import Header from './components/Header';
import NotFound from './components/NotFound';
import SignIn from './features/Auth/pages/SignIn';

// Lazy load - Code splitting
const Photo = React.lazy(() => import('./features/Photo'));

// Configure Firebase.
const config = {
	apiKey: process.env.REACT_APP_FIREBASE_API,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};
firebase.initializeApp(config);

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchProducts = async () => {
			const params = {
				_limit: 10,
			};
			const productList = await productApi.getAll(params);
			console.log(productList);
		};

		fetchProducts();
	}, []);

	// Handle firebase auth changed
	useEffect(() => {
		const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
			if (!user) {
				// user logs out, handle something here
				console.log('User is not logged in');
				return;
			}

			// Get me when signed in
			// const action = getMe();
			try {
				const actionResult = await dispatch(getMe());
				const currentUser = unwrapResult(actionResult);
				console.log('Logged in user: ', currentUser);
			} catch (error) {
				console.log('Failed to login ', error.message);
			}

			// console.log('Logged in user', user.displayName);

			// const token = await user.getIdToken();
			// console.log('Logged in user token: ', token);
		});

		return () => unregisterAuthObserver();
	}, []);

	const handleButtonClick = async () => {
		try {
			const params = {
				_limit: 10,
			};
			const productList = await productApi.getAll(params);
			console.log(productList);
		} catch (error) {}
	};

	return (
		<div className="photo-app">
			<Suspense fallback={<div>Loading ...</div>}>
				<BrowserRouter>
					<Header />

					<button onClick={handleButtonClick}>Fetch Product List</button>
					<Switch>
						<Redirect exact from="/" to="/photos" />

						<Route path="/photos" component={Photo} />
						<Route path="/sign-in" component={SignIn} />
						<Route component={NotFound} />
					</Switch>
				</BrowserRouter>
			</Suspense>
		</div>
	);
}

export default App;
