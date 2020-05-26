import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Film from './Film';

import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

//-----------------------------------//
const StyledMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5'
	}
})((props) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center'
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center'
		}}
		{...props}
	/>
));

// const StyledMenuItem = withStyles((theme) => ({
// 	root: {
// 		'&:focus': {
// 			backgroundColor: theme.palette.primary.main,
// 			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
// 				color: theme.palette.common.white
// 			}
// 		}
// 	}
// }))(MenuItem);

//----------------------------------//

const useStyles = makeStyles((theme) => ({
	icon: {
		marginRight: theme.spacing(2)
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6)
	},
	heroButtons: {
		marginTop: theme.spacing(4)
	},
	filmGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8)
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	cardMedia: {
		paddingTop: '56.25%' // 16:9
	},
	cardContent: {
		flexGrow: 1
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6)
	}
}));

export default function Album(props) {
	const [ films, setFilms ] = React.useState([]);

	const [ favFilms, setFavFilms ] = React.useState(JSON.parse(localStorage.getItem('favFilms')) || []);
	const classes = useStyles();

	const [ anchorEl, setAnchorEl ] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const favoriteBtnClickHandler = (id) => {
		let filmInd = favFilms.findIndex((fav) => fav.episode_id === id);
		const favFilmsCpy = [ ...favFilms ];
		if (filmInd !== -1) {
			favFilmsCpy.splice(filmInd, 1);
		} else {
			let film = films.find((film) => film.episode_id === id);
			//console.log(film);
			film = JSON.parse(JSON.stringify(film));
			favFilmsCpy.push(film);
		}
		setFavFilms(favFilmsCpy);
	};

	const favoritesBtnHandler = () => {
		props.history.push({
			pathname: '/favorites',
			query: { favFilms: favFilms }
		});
	};

	useEffect(() => {
		fetch('https://swapi.dev/api/films')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setFilms(data.results);
			});
	}, []);

	React.useEffect(
		() => {
			localStorage.setItem('favFilms', JSON.stringify(favFilms));
		},
		[ favFilms ]
	);

	let listOfAllfilmsToRender = films.map((film) => {
		return (
			<Grid item key={film.episode_id} xs={12} sm={6} md={4}>
				<Film
					id={film.episode_id}
					title={film.title}
					director={film.director}
					release_date={film.release_date}
					description={film.opening_crawl}
					favoriteBtnClicked={() => favoriteBtnClickHandler(film.episode_id)}
					isFavorite={favFilms.findIndex((favFilm) => favFilm.episode_id === film.episode_id) !== -1}
				/>
			</Grid>
		);
	});

	//-------------------------//
	let listOfFavFilmsToRender = favFilms.map((film) => {
		return (
			<MenuItem key={film.episode_id}>
				<ListItemIcon>
					<StarIcon fontSize="small" />
				</ListItemIcon>
				<ListItemText primary={film.title} />
			</MenuItem>
		);
	});
	//---------------------------//

	return (
		<React.Fragment>
			{/* <CssBaseline/> */}
			<AppBar position="relative">
				<Toolbar>
					<MovieFilterIcon className={classes.icon} />
					<Typography variant="h6" color="inherit" noWrap>
						Star Wars Films
					</Typography>
					<div>
						<Button
							aria-controls="customized-menu"
							aria-haspopup="true"
							variant="contained"
							color="primary"
							onClick={handleClick}
						>
							Favorites Films
						</Button>
						<StyledMenu
							id="customized-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							{listOfFavFilmsToRender}
						</StyledMenu>
					</div>
				</Toolbar>
			</AppBar>
			<main>
				{/* Hero unit */}
				<div className={classes.heroContent}>
					<Container maxWidth="sm">
						<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
							Star Wars Films
						</Typography>
						<div className={classes.heroButtons}>
							<Grid container spacing={2} justify="center">
								<Grid item>
									<Button variant="contained" color="primary" onClick={favoritesBtnHandler}>
										Favorites
									</Button>
								</Grid>
							</Grid>
						</div>
					</Container>
				</div>
				<Container className={classes.filmGrid} maxWidth="lg">
					{/* End hero unit */}
					<Grid container spacing={4}>
						{listOfAllfilmsToRender}
					</Grid>
				</Container>
			</main>
			{/* Footer */}
			<footer className={classes.footer}>
				<Typography variant="h6" align="center" gutterBottom>
					Footer
				</Typography>
				<Typography variant="subtitle1" align="center" color="textSecondary" component="p">
					Something here to give the footer a purpose!
				</Typography>
				<Copyright />
			</footer>
			{/* End footer */}
		</React.Fragment>
	);
}
