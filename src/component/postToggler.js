import React from 'react';
import Tabs from "@material-ui/core/Tabs";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import {NavLink, useLocation} from "react-router-dom";

const useStyles = makeStyles((theme) => (
		{
			root: {
				marginBottom: theme.spacing(2),
			},
			tabs: {
				borderBottom: `1px solid ${theme.palette.divider}`,
			},
		}))

const StyledTabs = withStyles((theme) =>({
	indicator: {
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		'& > div ': {
			maxWidth: 40,
			maxHeight: 1,
			width: '100%',
			backgroundColor: theme.palette.primary.main,
		},
	},
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const PostToggler = ({myPosts, favoritesPosts}) => {
	const classes = useStyles()
	const location = useLocation();
	return (
			<div className={classes.root}>
				<StyledTabs
						value={location.pathname}
						aria-label="disabled tabs example"
						className={classes.tabs}
				>
					<Tab
							label={'My Post'}
							to={myPosts}
							value={myPosts}
							exact
							component={NavLink}
					/>
					<Tab
							label={'Favorites Posts'}
							to={favoritesPosts}
							value={favoritesPosts}
							component={NavLink}
					/>
				</StyledTabs>
			</div>
	)
}

export default PostToggler;