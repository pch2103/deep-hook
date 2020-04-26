import React, {useEffect} from 'react';
import Box from "@material-ui/core/Box";
import {responsiveFontSizes, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import useFetch from "../../hooks/useFetch";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import {Link as MaterialLink} from "@material-ui/core/";
import Avatar from "@material-ui/core/Avatar";
import TagsRenderer from "../../component/tagsRenderer";


const useStyles = makeStyles((theme) => {
	const responsiveTheme = responsiveFontSizes(theme);
	return (
			{
				root: {
					width: '100%',
					padding: responsiveTheme.spacing(4),
					backgroundColor: responsiveTheme.palette.action.disabledBackground,
					textAlign: "left"
				},
				content: {
					marginTop: responsiveTheme.spacing(2),
				},
				subheader: {
					display: 'inline-flex',
					'& > div': {
						marginLeft: responsiveTheme.spacing(1),
					}
				},
				large: {
					width: theme.spacing(7),
					height: theme.spacing(7),
				},
				secondaryText: {
					color: theme.palette.text.secondary,
				},
			})
});

const Article = (props) => {
	const classes = useStyles();
	const slug = props.match.params.slug
	const apiUrl = `/articles/${slug}`
	const [{isLoading, response, error}, doFetch] = useFetch(apiUrl)

	useEffect(() => {
		doFetch()
	}, [doFetch])

	return (
			<>
				{isLoading && <CircularProgress disableShrink/>}
				{error && <div>Error...</div>}
				{!isLoading && response && (
						<>
							<Box className={classes.root}>
							<Container maxWidth="md">
								<Grid containerspacing={2}>
									<Grid item xs={12}>
									<Typography color='primary' variant="h2">
										{response.article.title}
									</Typography>
									</Grid>
									<Grid item xs={12} className={classes.subheader}>
										<Link to={`/profiles/${response.article.author.username}`}>
											<Avatar
													alt="Author avatar"
													src={response.article.author.image}
													className={classes.large}
											/>
										</Link>
										<div>
										<Typography variant="h5" >
											<MaterialLink
													to={`/profiles/${response.article.author.username}`}
													color="inherit"
													component={Link}>
												{response.article.author.username}
											</MaterialLink>
										</Typography>
										<span className={classes.secondaryText}>
											{response.article.createdAt}
										</span>
										</div>
									</Grid>
								</Grid>
							</Container>
							</Box>
							<Container maxWidth="md">
								<Grid containerspacing={2}>
									<Grid item xs={12}>
										<div>
											<p>{response.article.body}</p>
										</div>
										<TagsRenderer tags={response.article.tagList}/>
									</Grid>
								</Grid>
							</Container>
						</>
				)}
			</>
	)
}

export default Article;
