import React, {useEffect} from 'react';
import useFetch from "../hooks/useFetch";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Link} from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => (
		{
			root: {
				display: 'flex',
				flexWrap: 'wrap',
				marginTop: theme.spacing(2),
				'& > *': {
					margin: theme.spacing(0.5),
				}
			}
		}
))
const PopularTags = () => {
	const [{isLoading, response, error}, doFetch] = useFetch('/tags')
	const classes = useStyles();

	useEffect(() => {
		doFetch()
	}, [doFetch])


	return (
			<Paper className={classes.root}>
				{isLoading && <CircularProgress disableShrink/>}
				{error && <div>Error...</div>}
				{!isLoading && response &&
				<div className={classes.root}>
					{response.tags.map((tag) => {
								return (
										<Chip
												avatar={<Avatar>{[...tag.toUpperCase()].slice(0, 2)}</Avatar>}
												variant="outlined"
												clickable
												key={tag}
												to={`/tags/${tag}`}
												component={Link}
												label={tag}
										/>
								)
							}
					)}
				</div>
				}
			</Paper>

	)
};

export default PopularTags;