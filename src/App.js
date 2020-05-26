import React from 'react';
import Album from './components/Album';
import Favorites from './components/Favorites';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default function App() {
	return (
		<BrowserRouter>
			<Route exact path="/" component={Album} />
			<Route path="/favorites" component={Favorites} />
		</BrowserRouter>
	);
}
