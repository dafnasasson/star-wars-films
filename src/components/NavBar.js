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
		backgroundColor: '#1c1b1e',
		justifyContent: 'space-between'
	},
	logo: {
		display: 'flex',
		alignItems: 'center'
	},
	logoText: {
		color: 'black',
		textShadow: '-1px -1px 0 #FFE81F, 1px -1px 0 #FFE81F , -1px 1px 0 #FFE81F ,1px 1px 0 #FFE81F ',
		textTransform: 'uppercase',
		letterSpacing: '1px'
	}
}));

const NavBar = (props) => {
	const classes = useStyles();

	return (
		<AppBar position="relative">
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
