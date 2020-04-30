import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Favorite from '@material-ui/icons/Favorite';
import useFetch from "../hooks/useFetch";

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
}));


const AddToFavorites = ({isFavorited, favoritesCount, articleSlug}) => {
	const classes = useStyles();
	const apiUrl = `/articles/${articleSlug}/favorite`
	const [{response}, doFetch] = useFetch(apiUrl)
	const favoriteCountNew = response
			? response.article.favoritesCount
			: favoritesCount
	const isFavoritedNew = response
			? response.article.favorited
			: isFavorited

	const handleLike = (event) => {
		event.preventDefault()
		doFetch({
			method: isFavoritedNew ? 'delete' : 'post'
		})
	}

	return (
			<Button
					onClick={handleLike}
					variant={isFavoritedNew ? "contained" : "outlined"}
					color="primary"
					size="small"
					className={classes.button}
					startIcon={<Favorite />}
			>
				{favoriteCountNew}
			</Button>
	)
}

export default AddToFavorites;