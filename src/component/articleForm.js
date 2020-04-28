import React, {useEffect, useState} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import BackendErrorMessages from "./backendErrorMessages";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {responsiveFontSizes} from "@material-ui/core";

const useStyles = makeStyles((theme) => {
	const responsiveTheme = responsiveFontSizes(theme);
	return (
			{
				root: {
					flexGrow: 1,
					marginTop: responsiveTheme.spacing(4),
					justifyContent: "center"
				},
				paper: {
					padding: responsiveTheme.spacing(2),
					textAlign: 'center',
					color: responsiveTheme.palette.text.secondary,
				},
				item: {
					marginBottom: responsiveTheme.spacing(4),
				}
			})
});

const ArticleForm = ({onSubmit, errors, initialValues}) => {
	const classes = useStyles()
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [description, setDescription] = useState('')
	const [tagList, setTagList] = useState('')

	const handleSubmit = event => {
		event.preventDefault()
		const article = {
			title,
			description,
			body,
			tagList: tagList.split(' ')
		}
		onSubmit(article)
	}
	useEffect(() => {
		if (!initialValues) {
			return
		}
		setTitle(initialValues.title)
		setDescription(initialValues.description)
		setBody(initialValues.body)
		setTagList(initialValues.tagList.join(' '))
	}, [initialValues])

	return (
			<Container maxWidth="md">
				<Grid container className={classes.root}>
					<Grid item xs={12}>
				 		<Paper className={classes.paper}>
							<Typography variant="h2" gutterBottom>
								{'Article Form'}
							</Typography>
							<form onSubmit={handleSubmit}>
								{ errors &&
								<Grid container>
									<Grid item xs={12} className={classes.item}>
										<BackendErrorMessages backendErrors={errors}/>
									</Grid>
								</Grid>
								}
								<Grid container>
									<Grid item xs={12} className={classes.item}>
										<TextField
												required
												fullWidth
												id="title"
												type="text"
												label="Article title"
												variant="outlined"
												value={title}
												onChange={e => setTitle(e.target.value)}
										/>
									</Grid>
									<Grid item xs={12} className={classes.item}>
										<TextField
												required
												fullWidth
												id="description"
												type="text"
												label="What is article about?"
												variant="outlined"
												value={description}
												onChange={e => setDescription(e.target.value)}
										/>
									</Grid>
									<Grid item xs={12} className={classes.item}>
										<TextField
												required
												fullWidth
												id="body"
												multiline
												rows={8}
												label="Write your article"
												variant="outlined"
												value={body}
												onChange={e => setBody(e.target.value)}
										/>
									</Grid>
									<Grid item xs={12} className={classes.item}>
										<TextField
												fullWidth
												id="tagList"
												type="text"
												label="Enter tags"
												variant="outlined"
												value={tagList}
												onChange={e => setTagList(e.target.value)}
										/>
									</Grid>
									<Grid item xs={12}>
										<Button
												variant="contained"
												size="large"
												type="submit"
												color="primary"
												// disabled={isLoading}
										>
											Publish Article
										</Button>
									</Grid>
								</Grid>
							</form>
						</Paper>
					</Grid>
				</Grid>
			</Container>
	)
}

export default ArticleForm;