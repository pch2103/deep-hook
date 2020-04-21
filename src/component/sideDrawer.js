import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Drawer, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
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

const SideDrawer = ({drawer, toggleDrawer, menuTextAndLink}) => {
	const classes = useStyles();

	const list = () => (
			<div
					className={classes.list}
					role="presentation"
					onClick={toggleDrawer(false)}
					onKeyDown={toggleDrawer(false)}
			>
				<List>
				{ menuTextAndLink.map((content, i) => (
						<ListItem key={i} button to={content.link} component={NavLink}>
							<ListItemIcon>{content.icon}</ListItemIcon>
							<ListItemText primary={content.text}/>
						</ListItem>
						)
				)}
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