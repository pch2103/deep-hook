import React from 'react';
import {Link as MaterialLink} from "@material-ui/core/";
import {Link} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => (
		{
			root: {
				listStyleType: 'none',
				margin: theme.spacing(0.5),
				display: 'inline-flex'
			},
			link: {
				color: theme.palette.text.secondary,
				'&:hover': {
					textDecoration: 'none'
				}
			},
			rounded: {
				color: theme.palette.text.secondary,
				backgroundColor: theme.palette.background.paper,
				'&:hover': {
					background: 'rgba(255, 255, 255, 0.30)',
					transition: 'background .2s',
					opacity: 1,
				},
			},
			selected: {
				color: theme.palette.background.paper,
				backgroundColor: theme.palette.primary.main,
			}
		}))

const PaginationItem = ({page, currentPage, url}) => {
	const classes = useStyles();
	const liStyle = page === currentPage ? classes.selected : classes.rounded
	return (
			<MaterialLink
					className={classes.link}
					to={`${url}?page=${page}`}
					component={Link}
			>
				<li className={classes.root}>
					<Avatar variant="rounded" className={liStyle}>
						{page}
					</Avatar>
				</li>
			</MaterialLink>
	)
}

const PageListing = ({total, limit, url, currentPage}) => {
	const pagesCount = Math.ceil(total / limit);
	const pages = [...Array(pagesCount)].map((_, i) => (
			i + 1))

	return (
			<ul style={{padding: 0}}>
				{pages.map(page => (
						<PaginationItem
								page={page}
								currentPage={currentPage}
								url={url}
								key={page}
						/>
				))
				}
			</ul>
	)
}
export default PageListing