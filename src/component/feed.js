import React from 'react';
import {Link} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import {Link as MaterialLink} from "@material-ui/core/";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => (
		{
			root: {
				minWidth: 275,
				padding: theme.spacing(2),
				marginBottom: theme.spacing(2)
			},
			primaryText: {
				color: theme.palette.text.primary,
			},
			secondaryText: {
				color: theme.palette.text.secondary,
			},
			bullet: {
				display: 'inline-block',
				margin: '0 2px',
				transform: 'scale(0.8)',
			},
			title: {
				fontSize: 14,
			},
			pos: {
				marginBottom: 12,
			},
			large: {
				width: theme.spacing(7),
				height: theme.spacing(7),
			}
		}));

const Feed = ({articles}) => {
	const classes = useStyles();

	return (
			<div>
				{articles.map((article, index) => (
						<Card className={classes.root} variant="outlined" key={index}>
							<Grid container spacing={1}>
								<Grid item xs={2}>
									<Link to={`/profiles/${article.author.username}`}>
										<Avatar
												alt="Author_Link"
												src={article.author.image}
												className={classes.large}
										/>
									</Link>
								</Grid>
								<Grid item xs={10}>
									<div>
										<Typography variant="h6">
											<MaterialLink
													to={`/profiles/${article.author.username}`}
													className={classes.primaryText}
													component={Link}>
												{article.author.username}
											</MaterialLink>
										</Typography>
										<span className={classes.secondaryText}>
											{article.createdAt}
										</span>
									</div>
									<MaterialLink to={`/articles/${article.slug}`}>
										<Typography variant="h5">{article.title}</Typography>
										<p className={classes.secondaryText}>{article.description}</p>
										<span className={classes.secondaryText}>Read more...</span>
										<ul>
											{article.tagList.map(tag => (
													<li key={tag}>
														{tag}
													</li>
											))}
										</ul>
									</MaterialLink>
								</Grid>
							</Grid>
						</Card>
				))}
			</div>
	)
};

export default Feed;