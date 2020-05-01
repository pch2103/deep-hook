import React, {useEffect} from 'react';
import {stringify} from "query-string";
import {getPaginator, limit} from '../../../component/utils'
import useFetch from "../../../hooks/useFetch";
import CircularProgress from "@material-ui/core/CircularProgress";
import Feed from "../../../component/feed";
import PageListing from "../../../component/pageListing";

const getApiUrl = ({username, offset, isFavorites}) => {
	const params = isFavorites
			? {limit, offset, favorited: username}
			: {limit, offset, author: username}

	return `/articles?${stringify(params)}`
}

const UserArticles = ({username, location, isFavorites, url}) => {
	const {offset, currentPage} = getPaginator(location.search)
	const apiUrl = getApiUrl({username, offset, isFavorites})
	const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)

	useEffect(() => {
		doFetch()
	}, [doFetch, isFavorites, currentPage])

	return (
			<div>
				{isLoading && <CircularProgress disableShrink/>}
				{error && <div>Error...</div>}
				{!isLoading && response && (
						<>
							<Feed articles={response.articles}/>
							<PageListing
									total={response.articlesCount}
									limit={limit}
									url={url}
									currentPage={currentPage}
							/>
							</>
							)}</div>
	)
}

export default UserArticles;