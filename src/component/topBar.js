import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import MenuIcon from '@material-ui/icons/Menu'

import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider} from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import AppNav from "./appNav"
import {Link} from "react-router-dom"
import clsx from 'clsx';
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
			hide: {
				display: 'none',
			},
			list: {
				width: 250,
			},
			fullList: {
				width: 'auto',
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
	};
	const list = () => (
			<div
					className={classes.list}
					role="presentation"
					onClick={toggleDrawer(false)}
					onKeyDown={toggleDrawer(false)}
			>
				<List>
					{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{['All mail', 'Trash', 'Spam'].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
					))}
				</List>
			</div>
	);

		console.log(drawer)


	return (
			<div>
				<Drawer open={drawer} onClose={toggleDrawer(false)}>
					{list()}
				</Drawer>
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
						<Link to='/' exact='true'>
							<AppLogo/>
						</Link>
						<Hidden xsDown>
							<AppNav/>
							<Button width={90} color="inherit" to='/login' component={Link} className={classes.menuButton}>Sing
								in</Button>&nbsp;
							<Button to='/register' component={Link} variant="contained" color="secondary">Sing
								up</Button>
						</Hidden>
					</Toolbar>
				</AppBar>
			</div>
	);
};

export default TopBar;
