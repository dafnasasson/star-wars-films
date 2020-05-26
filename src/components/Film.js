import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles((theme) => ({
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	cardDirector: {
		marginBottom: '2em'
	},
	favIcon: {
		display: 'flex',
		justifyContent: 'space-between'
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
		<Card className={classes.card}>
			<CardContent className={classes.cardContent}>
				<Typography className={classes.favIcon} gutterBottom variant="h5" component="h2">
					{props.title}
					<Button size="small" color="primary" onClick={() => props.favoriteBtnClicked(props.id)}>
						{favoriteIcon}
					</Button>
				</Typography>
				<Typography variant="subtitle2">Release Date: {props.release_date}</Typography>
				<Typography variant="subtitle2" className={classes.cardDirector}>
					Director: {props.director}
				</Typography>
				<Typography>{props.description} </Typography>
			</CardContent>
			{/* <CardActions /> */}
			<Button size="small" color="primary" onClick={props.readMoreBtnClicked}>
				<MoreHorizIcon />
			</Button>
		</Card>
	);
};

export default Film;
