import React from 'react';
import {Link} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import {Link as MaterialLink} from "@material-ui/core/";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import TagsRenderer from "./tagsRenderer";
import AddToFavorites from "./addToFavorites";

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
			avatar: {
				[theme.breakpoints.up('sm')]: {
					width: theme.spacing(7),
					height: theme.spacing(7),
				},
				[theme.breakpoints.down('xs')]: {
					width: theme.spacing(4),
					height: theme.spacing(4),
				}
			},
			likedName: {
				width: '100%',
				display: 'flex',
				justifyContent: "space-between"
			},
			like: {
				flexShrink: 0,
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
												className={classes.avatar}
										/>
									</Link>
								</Grid>
								<Grid item xs={10}>
									<div className={classes.likedName}>
										<Typography variant="h5">
											<MaterialLink
													to={`/profiles/${article.author.username}`}
													color="inherit"
													component={Link}>
												{article.author.username}
											</MaterialLink>
										</Typography>
										<div className={classes.like}>
										<AddToFavorites
												isFavorited={article.favorited}
												favoritesCount={article.favoritesCount}
												articleSlug={article.slug}
										/>
										</div>
									</div>
									<Typography variant="caption">
											{article.createdAt}
									</Typography>
									<Typography variant="h5">
										<MaterialLink to={`/articles/${article.slug}`} component={Link}>
											{article.title}
										</MaterialLink>
									</Typography>
									<p className={classes.secondaryText}>{article.description}</p>
									<span className={classes.secondaryText}>Read more...</span>
									<TagsRenderer tags={article.tagList}/>
								</Grid>
								<Grid item xs={1}>
								</Grid>
							</Grid>
						</Card>
				))}
			</div>
	)
};

export default Feed;