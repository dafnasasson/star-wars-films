import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	cardDirector: {
		marginBottom: '2em'
	},
	cardTitle: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '0'
	},
	divider: {
		marginLeft: '0',
		marginTop: '0',
		marginBottom: '1em',
		width: '75%'
	}
}));

const Film = (props) => {
	const classes = useStyles();
	const favoriteIcon = props.isFavorite ? (
		<FavoriteIcon fontSize="large" color="secondary" />
	) : (
		<FavoriteBorderIcon fontSize="large" color="secondary" />
	);

	return (
		<Box boxShadow={6}>
			<Card className={classes.card}>
				<CardContent className={classes.cardContent}>
					<Typography className={classes.cardTitle} gutterBottom variant="h5" component="h2">
						{props.title}
						<Button size="small" color="primary" onClick={() => props.favoriteBtnClicked(props.id)}>
							{favoriteIcon}
						</Button>
					</Typography>
					<Divider variant="middle" className={classes.divider} />
					<Typography variant="subtitle2" style={{ letterSpacing: '1px' }}>
						RELEASE DATE: {props.release_date}
					</Typography>
					<Typography variant="subtitle2" className={classes.cardDirector} style={{ letterSpacing: '1px' }}>
						DIRECTOR: {props.director.toUpperCase()}
					</Typography>
					<Typography>{props.description} </Typography>
				</CardContent>
				<Button size="small" color="primary" onClick={props.readMoreBtnClicked}>
					<MoreHorizIcon />
				</Button>
			</Card>
		</Box>
	);
};

export default Film;
