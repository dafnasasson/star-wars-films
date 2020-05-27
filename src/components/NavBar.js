import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	icon: {
		marginRight: theme.spacing(2)
	},
	toolbar: {
		display: 'flex',
		backgroundColor: '#262626',
		justifyContent: 'space-between'
	},
	logo: {
		display: 'flex',
		alignItems: 'center'
	},
	logoText: {
		fontFamily: 'Orbitron',
		color: 'black',
		textShadow: '-0.5px -0.5px 0 #FFE81F, 0.5px 0.5px 0 #FFE81F , -0.5px 0.5px 0 #FFE81F ,0.5px 0.5px 0 #FFE81F ',
		textTransform: 'uppercase',
		letterSpacing: '2px',
		fontSize: '20px'
	},
	appBar: {
		zIndex: '0'
	}
}));

const NavBar = (props) => {
	const classes = useStyles();

	return (
		<AppBar position="relative" className={classes.appBar}>
			<Toolbar className={classes.toolbar}>
				<div className={classes.logo}>
					<MovieFilterIcon className={classes.icon} />
					<Typography className={classes.logoText} variant="h6" color="inherit" noWrap>
						Star Wars
					</Typography>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
