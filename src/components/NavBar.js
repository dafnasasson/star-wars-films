import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../assets/starwars-logo.svg';
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
		alignItems: 'center',
		height: '4em'
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
					<img className={classes.logo} src={logo} alt="star wars logo" />
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
