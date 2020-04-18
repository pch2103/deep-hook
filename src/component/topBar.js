import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AppNav from "./appNav"
import {Link} from "react-router-dom"
import {ReactComponent as AppLogo} from './AppLogoDark.svg'

const useStyles = makeStyles((theme) => (
		{
			root: {
				flexGrow: 1,
			},
			menuButton: {
				marginRight: theme.spacing(2),
			},
			logo: {
				marginRight: theme.spacing(1),
			},
			nav: {
				flexGrow: 1,
			},
		}));

const TopBar = () => {
	const classes = useStyles();

	return (
			<div>
				<AppBar position="static">
					<Toolbar>
						<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
							<MenuIcon/>
						</IconButton>
						<Link to='/' exact='true'>
							<AppLogo className={classes.logo}/>
						</Link>
						<AppNav/>
						<Button width={90} color="inherit" to='/login' component={Link} className={classes.menuButton}>Sing
							in</Button>&nbsp;
						<Button to='/register' component={Link} variant="contained" color="secondary">Sing
							up</Button>
					</Toolbar>
				</AppBar>
			</div>
	);
};

export default TopBar;
