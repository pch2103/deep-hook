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
import FeedToggler from "../../component/feedToggler";
import withWidth from '@material-ui/core/withWidth';

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

const GlobalFeed = (props) => {
	const {currentPage, offset} = getPaginator(props.location.search)
	const currentWidth = props.width
	const classes = useStyles();
	const stringifiedParams = stringify(
			{
				limit,
				offset
			} //=> 'limit=10&offset=0'
	)
	const url = props.match.url
	const apiUrl = `/articles?${stringifiedParams}`
	const [{isLoading, response, error}, doFetch] = useFetch(apiUrl)
	useEffect(() => {
		doFetch()
	}, [doFetch, currentPage, currentWidth])


	const bigCol = currentWidth === 'xs' ? 12 : 9
	const smallCol = currentWidth === 'xs' ? 12 : 3
	return (
			<>
				<Box className={classes.root}>
					<Typography variant="h2">Global Feed from Test base</Typography>
					<Typography variant="h5" className={classes.subheader}>A place to share knowledge</Typography>
				</Box>
				<Container maxWidth="md" className={classes.content}>
					<Grid container spacing={2}>
						<Grid item xs={bigCol}>
							<FeedToggler />
							{isLoading && <CircularProgress disableShrink/>}
							{error && <div>Error...</div>}
							{!isLoading && response &&
							<>
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
						<Grid item xs={smallCol}>
							<Typography variant="h5" className={classes.subheader}>Popular tags</Typography>
							<PopularTags />
						</Grid>
					</Grid>
				</Container>
			</>
	)
};

export default withWidth()(GlobalFeed);
