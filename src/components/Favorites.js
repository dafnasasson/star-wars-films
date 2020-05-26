import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/Star';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		maxWidth: 752
	},
	demo: {
		backgroundColor: theme.palette.background.paper
	},
	title: {
		margin: theme.spacing(4, 0, 2)
	},
	icon: {
		paddingRight: 40
	}
}));

const Favorits = (props) => {
	const classes = useStyles();
	const [ dense, setDense ] = React.useState(false);
	const [ secondary, setSecondary ] = React.useState(false);
	console.log(props.location.query);

	let listOfFavFilms = props.location.query.favFilms.map((film) => {
		// return <li key={film.episode_id}>{film.title}</li>;
		return (
			<div key={film.episode_id} className={classes.root}>
				<ExpansionPanel>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<StarIcon className={classes.icon} />
						<Typography className={classes.heading}>{film.title}</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Typography>{film.opening_crawl}</Typography>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		);
	});

	return (
		<div>
			<Typography variant="h5">My Favorites: </Typography>
			<ul className={classes.demo}>{listOfFavFilms}</ul>
			<Button onClick={() => props.history.goBack()}>Return to Main Page</Button>
		</div>
	);
};

export default Favorits;
