import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Spinner from './Spinner/Spinner';

const useStyles = makeStyles({
	root: {
		minWidth: 275
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	}
});

const FilmFullContent = (props) => {
	const [ characters, setCharacters ] = React.useState([]);
	const classes = useStyles();

	const film = props.location.query ? props.location.query.film : JSON.parse(localStorage.getItem('film'));

	React.useEffect(() => {
		if (props.location.query) {
			localStorage.setItem('film', JSON.stringify(props.location.query.film));
		}
		let characters = film.characters;
		Promise.all(
			characters.map((character) =>
				fetch(character)
					.then((response) => response.json())
					.then((data) => data.name)
					.catch((logError) => console.log(logError))
			)
		).then((data) => {
			data = data.slice(0, 3);
			data = data.join(',') + '...';
			setCharacters(data);
		});
	}, []);

	let contentToRender = <Spinner />;
	if (characters.length) {
		contentToRender = (
			<div>
				<Card className={classes.card}>
					<CardContent className={classes.cardContent}>
						<Typography variant="subtitle2">Title: {film.title}</Typography>
						<Typography variant="subtitle2">Release Date: {film.release_date}</Typography>
						<Typography variant="subtitle2" className={classes.cardDirector}>
							Director: {film.director}
						</Typography>
						<Typography variant="subtitle2" className={classes.cardDirector}>
							Producer: {film.producer}
						</Typography>
						<Typography variant="subtitle2" className={classes.cardDirector}>
							Characters: {characters}
						</Typography>
						<Typography variant="subtitle2" className={classes.cardDirector}>
							Summary:
						</Typography>
						<Typography>{film.opening_crawl} </Typography>
					</CardContent>
				</Card>
				<Button onClick={() => props.history.goBack()}>
					<ArrowBackIcon />
					Back
				</Button>
			</div>
		);
	}

	return <React.Fragment>{contentToRender}</React.Fragment>;
};

export default FilmFullContent;
