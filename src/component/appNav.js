import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {makeStyles} from "@material-ui/core/styles";
import {NavLink} from "react-router-dom";


const useStyles = makeStyles({
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
	}
});

export default function AppNav() {
	const classes = useStyles();

	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
				<Tabs
						value={value}
						onChange={handleChange}
						aria-label="disabled tabs example"
						centered
						className={classes.root}
				>
					<Tab label="To Home" to='/' exact component={NavLink} className={classes.tabItem} />
					<Tab label="Articles" to='/articles/a' component={NavLink} className={classes.tabItem}/>
				</Tabs>
	);
}