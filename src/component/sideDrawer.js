import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home'
import DescriptionIcon from '@material-ui/icons/Description'
import SingUpIcon from '@material-ui/icons/PermIdentity'
import SingInIcon from '@material-ui/icons/HowToReg'
import {NavLink} from "react-router-dom"

const useStyles = makeStyles((theme) => (
		{
			list: {
				width: 250,
			},
			fullList: {
				width: 'auto',
			},
		}));

const SideDrawer = ({drawer, toggleDrawer}) => {
	const classes = useStyles();

	const list = () => (
			<div
					className={classes.list}
					role="presentation"
					onClick={toggleDrawer(false)}
					onKeyDown={toggleDrawer(false)}
			>
				<List>
					<ListItem button to='/'   component={NavLink}>
						<ListItemIcon><HomeIcon/></ListItemIcon>
						<ListItemText primary='To Home'/>
					</ListItem>
					<ListItem button to='/articles/a' component={NavLink}>
						<ListItemIcon><DescriptionIcon/></ListItemIcon>
						<ListItemText primary='Article'/>
					</ListItem>
				</List>
				<Divider/>
				<List>
					<ListItem button to='/login' component={NavLink}>
						<ListItemIcon><SingInIcon/></ListItemIcon>
						<ListItemText primary='Sing In'/>
					</ListItem>
					<ListItem button to='/register' component={NavLink}>
						<ListItemIcon><SingUpIcon/></ListItemIcon>
						<ListItemText primary='Sing Up'/>
					</ListItem>
				</List>
			</div>
	);

	return (
			<Drawer open={drawer} onClose={toggleDrawer(false)}>
				{list()}
			</Drawer>
	)
};

export default SideDrawer;