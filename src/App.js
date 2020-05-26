import React from 'react';
import FilmsCollection from './components/FilmsCollection';
import FilmFullContent from './components/FilmFullContent';
import NavBar from './components/NavBar';
import { BrowserRouter, Route } from 'react-router-dom';

export default function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Route exact path="/" component={FilmsCollection} />
			<Route path="/fullContent" component={FilmFullContent} />
		</BrowserRouter>
	);
}
