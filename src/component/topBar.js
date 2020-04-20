import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import MenuIcon from '@material-ui/icons/Menu'
import AppNav from "./appNav"
import {NavLink} from "react-router-dom"
import clsx from 'clsx';
import {ReactComponent as AppLogo} from './AppLogoDark.svg'
import SideDrawer from "./sideDrawer";

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
			hide: {
				display: 'none',
			},
		}));


const TopBar = () => {
	const classes = useStyles();
	const [drawer, setDrawer] = useState(false);

	const toggleDrawer = (open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setDrawer(open);
	}

	return (
			<div>
				<SideDrawer drawer={drawer} toggleDrawer={toggleDrawer}/>
				<AppBar position="static">
					<Toolbar>
						<Hidden smUp>
							<IconButton
									edge="start"
									className={clsx(classes.menuButton, drawer && classes.hide)}
									color="inherit"
									aria-label="open drawer"
									onClick={toggleDrawer(true)}
							>
								<MenuIcon/>
							</IconButton>
						</Hidden>
						<NavLink to='/' exact>
							<AppLogo/>
						</NavLink>
						<Hidden xsDown>
							<AppNav/>
							<Button width={90} color="inherit" to='/login' component={NavLink} className={classes.menuButton}>Sing
								in</Button>&nbsp;
							<Button to='/register' component={NavLink} variant="contained" color="secondary">Sing
								up</Button>
						</Hidden>
					</Toolbar>
				</AppBar>
			</div>
	);
};

export default TopBar;
