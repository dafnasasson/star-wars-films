import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Film from './Film';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import { Link as LinkRouter } from 'react-router-dom';

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

const useStyles = makeStyles((theme) => ({
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
	},
	favoriteBtn: {
		border: '1px solid',
		lineHeight: 1.5,
		// backgroundColor: '#FFE81F',
		borderColor: '#1C1B1E',
		color: 'white',
		textShadow: '-1px -1px 0 #1C1B1E, 1px -1px 0 #1C1B1E , -1px 1px 0 #1C1B1E ,1px 1px 0 #1C1B1E ',
		letterSpacing: '2px',
		fontSize: '25px'
	},
	listItemTxt: {
		textDecoration: 'none',
		color: theme.palette.primary.dark
	},
	icon: {
		color: '#FFE81F'
	},
	menuItem: {
		backgroundColor: '#1C1B1E',
		color: 'white'
	}
}));

const FilmsCollection = (props) => {
	const [ films, setFilms ] = React.useState([]);
	const [ favFilms, setFavFilms ] = React.useState(JSON.parse(localStorage.getItem('favFilms')) || []);
	const classes = useStyles();

	const [ anchorEl, setAnchorEl ] = React.useState(null);

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

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const shortenSummary = (summary, maxLen = 155) => {
		if (summary.length <= maxLen) return summary;

		const words = summary.split(' ');
		let currLen = words.map((el) => el.length).reduce((sum, curr) => sum + curr, 0);

		while (currLen > maxLen) {
			const word = words.pop();
			currLen -= word.length;
		}

		return words.join(' ') + '...';
	};

	const favoriteBtnClickHandler = (id) => {
		let filmInd = favFilms.findIndex((fav) => fav.episode_id === id);
		const favFilmsCpy = [ ...favFilms ];
		if (filmInd !== -1) {
			favFilmsCpy.splice(filmInd, 1);
		} else {
			let film = films.find((film) => film.episode_id === id);
			film = JSON.parse(JSON.stringify(film));
			favFilmsCpy.push(film);
		}
		setFavFilms(favFilmsCpy);
	};

	const readMoreBtnHandler = (id) => {
		const film = films.find((film) => film.episode_id === id);
		props.history.push({
			pathname: '/fullContent',
			query: { film: film }
		});
	};

	let listOfAllfilmsToRender = films.map((film) => {
		return (
			<Grid item key={film.episode_id} xs={12} sm={6} md={4}>
				<Film
					id={film.episode_id}
					title={film.title}
					director={film.director}
					release_date={film.release_date}
					description={shortenSummary(film.opening_crawl)}
					favoriteBtnClicked={() => favoriteBtnClickHandler(film.episode_id)}
					isFavorite={favFilms.findIndex((favFilm) => favFilm.episode_id === film.episode_id) !== -1}
					readMoreBtnClicked={() => readMoreBtnHandler(film.episode_id)}
				/>
			</Grid>
		);
	});

	//-------------------------//
	let listOfFavFilmsToRender = favFilms.map((film) => {
		return (
			<LinkRouter
				to={{
					pathname: '/fullContent',
					query: { film: film }
				}}
				key={film.episode_id}
				className={classes.listItemTxt}
			>
				<MenuItem className={classes.menuItem}>
					<ListItemIcon>
						<StarIcon className={classes.icon} fontSize="small" />
					</ListItemIcon>
					<ListItemText primary={film.title} />
				</MenuItem>
			</LinkRouter>
		);
	});
	//---------------------------//

	return (
		<React.Fragment>
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
									<Button
										className={classes.favoriteBtn}
										aria-controls="customized-menu"
										aria-haspopup="true"
										variant="contained"
										variant="outlined"
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
					Dafna Sasson
				</Typography>
				<Typography variant="subtitle1" align="center" color="textSecondary" component="p">
					a STAR WARS fan!
				</Typography>
			</footer>
			{/* End footer */}
		</React.Fragment>
	);
};

export default FilmsCollection;