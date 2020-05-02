import React, {useContext, useEffect, useState} from 'react';
import Box from "@material-ui/core/Box";
import {Hidden, responsiveFontSizes, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import useFetch from "../../hooks/useFetch";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {Link, Redirect} from "react-router-dom";
import {Link as MaterialLink} from "@material-ui/core/";
import Avatar from "@material-ui/core/Avatar";
import TagsRenderer from "../../component/tagsRenderer";
import {CurrentUserContext} from "../../contexts/currentUsers";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Create';


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
				header: {
					marginBottom: responsiveTheme.spacing(2),
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
				button: {
					marginLeft: responsiveTheme.spacing(1),
				},
			})
});

const Article = (props) => {
	const [currentUserState] = useContext(CurrentUserContext)
	const classes = useStyles();
	const slug = props.match.params.slug
	const apiUrl = `/articles/${slug}`
	const [{
		isLoading: fetchArticleIsLoading,
		response: fetchArticleResponse,
		error: fetchArticleError}, doFetch] = useFetch(apiUrl)
	const [{response: deleteArticleResponse}, doDeleteArticle] = useFetch(apiUrl)
	const [isSuccessfulDelete, setIsSuccessfulDelete] = useState(false)
	const isAuthor = () => {
		if (!fetchArticleResponse || !currentUserState.isLoggedIn) {
			return false
		}
		return (
				fetchArticleResponse.article.author.username === currentUserState.currentUser.username
		)
	}
	const deleteArticle = () => {
		doDeleteArticle({
			method: 'delete'
		})
	}
	useEffect(() => {
		doFetch()
	}, [doFetch])

	useEffect(()=>{
		if(!deleteArticleResponse) {
			return
		}
		setIsSuccessfulDelete(true)
	},[deleteArticleResponse])

	if(isSuccessfulDelete){
		return <Redirect to='/' />
	}

	return (
			<>
				{fetchArticleIsLoading && <CircularProgress disableShrink/>}
				{fetchArticleError && <div>Error...</div>}
				{!fetchArticleIsLoading && fetchArticleResponse && (
						<>
							<Box className={classes.root}>
								<Container maxWidth="md">
									<Grid containerspacing={2}>
										<Grid item className={classes.header} xs={12}>
											<Typography color='primary' variant="h4">
												{fetchArticleResponse.article.title}
											</Typography>
										</Grid>
										<Grid item xs={12} className={classes.subheader}>
											<Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
												<Avatar
														alt="Author avatar"
														src={fetchArticleResponse.article.author.image}
														className={classes.large}
												/>
											</Link>
											<div>
												<Typography variant="h5">
													<MaterialLink
															to={`/profiles/${fetchArticleResponse.article.author.username}`}
															color="inherit"
															component={Link}>
														{fetchArticleResponse.article.author.username}
													</MaterialLink>
												</Typography>
												<span className={classes.secondaryText}>
													{fetchArticleResponse.article.createdAt}
												</span>
											</div>
											<Hidden xsDown>
											{isAuthor() && (
													<div>
														<Button
																variant="outlined"
																color="primary"
																startIcon={<EditIcon/>}
																className={classes.button}
																to={`/articles/${fetchArticleResponse.article.slug}/edit`}
																component={Link}
														>
															Edit
														</Button>
														<Button
																variant="contained"
																color="secondary"
																startIcon={<DeleteIcon/>}
																className={classes.button}
																onClick={deleteArticle}
														>
															Delete
														</Button>
													</div>
											)}
											</Hidden>
										</Grid>
										<Hidden smUp>
										<Grid item xs={12} className={classes.subheader}>
											{isAuthor() && (
													<div>
														<Button
																variant="outlined"
																color="primary"
																startIcon={<EditIcon/>}
																className={classes.button}
																to={`/articles/${fetchArticleResponse.article.slug}/edit`}
																component={Link}
														>
															Edit
														</Button>
														<Button
																variant="contained"
																color="secondary"
																startIcon={<DeleteIcon/>}
																className={classes.button}
																onClick={deleteArticle}
														>
															Delete
														</Button>
													</div>
											)}
										</Grid>
										</Hidden>
									</Grid>
								</Container>
							</Box>
							<Container maxWidth="md">
								<Grid containerspacing={2}>
									<Grid item xs={12}>
										<div>
											<p>{fetchArticleResponse.article.body}</p>
										</div>
										<TagsRenderer tags={fetchArticleResponse.article.tagList}/>
									</Grid>
								</Grid>
							</Container>
						</>
				)}
			</>
	)
}

export default Article;
