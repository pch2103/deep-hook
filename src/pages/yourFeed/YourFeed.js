import React, {useEffect} from 'react';
import useFetch from "../../hooks/useFetch";
import Feed from "../../component/feed";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import {responsiveFontSizes, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import PageListing from "../../component/pageListing";
import {getPaginator, limit} from '../../component/utils'
import {stringify} from 'query-string'
import PopularTags from "../../component/popularTags";
import FeedToogler from "../../component/feedToogler";

const useStyles = makeStyles((theme) => {
	const responsiveTheme = responsiveFontSizes(theme);
	return (
			{
				root: {
					width: '100%',
					padding: responsiveTheme.spacing(4),
					backgroundColor: responsiveTheme.palette.action.disabledBackground,
					textAlign: "center"
				},
				content: {
					marginTop: responsiveTheme.spacing(4),
				},
				subheader: {
					color: responsiveTheme.palette.primary.main,
				}
			})
});

const YourFeed = (props) => {
	const {currentPage, offset} = getPaginator(props.location.search)
	const classes = useStyles();
	const stringifiedParams = stringify(
			{
				limit,
				offset
			} //=> 'limit=10&offset=0'
	)
	const url = props.match.url
	const apiUrl = `/articles/feed?${stringifiedParams}`
	const [{isLoading, response, error}, doFetch] = useFetch(apiUrl)

	useEffect(() => {
		doFetch()
	}, [doFetch, currentPage])

	return (
			<>
				<Box className={classes.root}>
					<Typography variant="h2">Global Feed from Test base</Typography>
					<Typography variant="h5" className={classes.subheader}>A place to share knowledge</Typography>
				</Box>
				<Container maxWidth="md" className={classes.content}>
					<Grid container spacing={2}>
						<Grid item xs={9}>
							<FeedToogler />
							{isLoading && <CircularProgress disableShrink/>}
							{error && <div>Error...</div>}
							{!isLoading && response &&
							<>
								{!response.articles.articlesCount && <div>No articles are here... yet.'</div>}
							<Feed articles={response.articles}/>
								<PageListing
										total={response.articlesCount}
										limit={limit}
										url={url}
										currentPage={currentPage}
								/>
							</>
							}
						</Grid>
						<Grid item xs={3}>
							<Typography variant="h5" className={classes.subheader}>Popular tags</Typography>
							<PopularTags />
						</Grid>
					</Grid>
				</Container>
			</>
	)
};

export default YourFeed;