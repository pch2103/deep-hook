import React, {useEffect} from 'react';
import useFetch from "../../hooks/useFetch";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import PostToggler from "../../component/postToggler";
import UserArticles from "./components/userArticles";
import CircularProgress from "@material-ui/core/CircularProgress";
// import {Redirect, useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => {
	return (
			{
				root: {
					width: '100%',
					padding: theme.spacing(6),
					backgroundColor: theme.palette.action.disabledBackground,
					display: 'flex',
					textAlign: "center",
				},
				content: {
					marginTop: theme.spacing(2),
				},
				header: {
					display: 'flex',
					justifyContent: "center",
					marginBottom: theme.spacing(2),
				},

				large: {
					width: theme.spacing(16),
					height: theme.spacing(16),
				},
				secondaryText: {
					color: theme.palette.text.secondary,
				},
				button: {
					marginLeft: theme.spacing(1),
				},
			})
});
const UserProfile = ({location, match}) => {
	const classes = useStyles();
	const slug = match.params.slug
	const isFavorites = location.pathname.includes('favorites')
	const apiUrl = `/profiles/${slug}`
	const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)

	useEffect(()=>{
		doFetch()
	},[doFetch, slug])

	if(!response){
		return null
	}

	return (

			 <>
				 <Box className={classes.root}>
					 <Container maxWidth="md">
						 <Grid containerspacing={2}>
							 <Grid item xs={12} className={classes.header}>
								 <Avatar
										 alt="User avatar"
										 src={response.profile.image}
										 className={classes.large}
								 />
							 </Grid>
							 <Grid item xs={12}>
								 <Typography color='inherit' variant="h4">
									 {response.profile.username}
								 </Typography>
							 </Grid>
							 <Grid item className={classes.secondaryText} xs={12}>
								 <Typography color='inherit' variant="subtitle1">
									 {response.profile.bio}
								 </Typography>
							 </Grid>
						 </Grid>
					 </Container>
				 </Box>
				 {isLoading && <CircularProgress disableShrink/>}
				 {error && <div>Error...</div>}
				 {!isLoading && response && slug === response.profile.username &&
				<Container maxWidth="md" className={classes.content}>
					<Grid container spacing={2}>
						<Grid item xs={12}>

							<PostToggler
									myPosts={`/profiles/${response.profile.username}`}
									favoritesPosts={`/profiles/${response.profile.username}/favorites`}
							/>

						</Grid>
						<Grid item xs={12}>
							<UserArticles
									username={response.profile.username}
									location={location}
									isFavorites={isFavorites}
									url={location.pathname}
							/>
						</Grid>
					</Grid>
				</Container>
				}
			</>
)
}

export default UserProfile;