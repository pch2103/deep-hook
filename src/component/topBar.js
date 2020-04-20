import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import MenuIcon from '@material-ui/icons/Menu'
import {NavLink, useLocation} from "react-router-dom"
import clsx from 'clsx';
import {ReactComponent as AppLogo} from './AppLogoDark.svg'
import SideDrawer from "./sideDrawer";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles((theme) => (
		{
			root: {
				flexGrow: 1,
			},
			tabItem: {
				height: 60,
				'&:hover': {
					background: 'rgba(255, 255, 255, 0.18)',
					transition: 'background .3s',
					opacity: 1,
				},
				'&:focus': {
					background: 'rgba(0, 0, 0, 0.07)',
					opacity: 1,
				},

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
	const menuConfig = [
		{
			"text": "To Home",
			"link": "/"
		},
		{
			"text": "Articles",
			"link": "/articles/a"
		},
		{
			"text": "Sing In",
			"link": "/login"
		},
		{
			"text": "Sing Up",
			"link": "/register"
		},
	]

	const [drawer, setDrawer] = useState(false);
	const location = useLocation();


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
						<NavLink to='/' exact >
							<AppLogo/>
						</NavLink>
						<Hidden xsDown>
							<Tabs
									value={ location.pathname }
									aria-label="disabled tabs example"
									centered
									className={classes.root}
							>
								{menuConfig.map((content, i) => (
									  <Tab
												key={i}
												label={content.text}
												to={content.link}
												value={ content.link }
												component={NavLink}
												className={classes.tabItem}
										/>
										)
								)}
							</Tabs>
						</Hidden>
					</Toolbar>
				</AppBar>
			</div>
	);
};

export default TopBar;
