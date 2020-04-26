import React from 'react';
import Chip from "@material-ui/core/Chip";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

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

const TagsRenderer = ({tags}) => {
	const classes = useStyles()

	return (
			<div className={classes.root}>
				{tags.map(tag => (
						<Chip
								variant="outlined"
								clickable
								key={tag}
								to={`/tags/${tag}`}
								component={Link}
								label={tag}
						/>
				))}
			</div>
	)
}

export default TagsRenderer;