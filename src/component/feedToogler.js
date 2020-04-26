import React, {useContext} from 'react';
import Tabs from "@material-ui/core/Tabs";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import {NavLink, useLocation} from "react-router-dom";
import  {CurrentUserContext} from '../contexts/currentUsers'

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

const FeedToogler = ({tagName}) => {
	const classes = useStyles()
	const location = useLocation();
	const [currentUserState] = useContext(CurrentUserContext);

	return (
			<div className={classes.root}>
				<StyledTabs
						value={location.pathname}
						aria-label="disabled tabs example"
						className={classes.tabs}
				>
					{ currentUserState.currentUser &&
					<Tab
							label={'Your feed'}
							to={'/feed'}
							value={'/feed'}
							component={NavLink}
					/>
					}
					<Tab
							label={'Global feed'}
							to={'/'}
							exact
							value={'/'}
							component={NavLink}
					/>
					{tagName &&
					<Tab
							label={tagName}
							to={`/tags/${tagName}`}
							value={`/tags/${tagName}`}
							component={NavLink}
					/>
					}
				</StyledTabs>
			</div>
	)
}

export default FeedToogler;