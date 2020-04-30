import React, {useContext, useEffect, useState} from 'react';
import {CurrentUserContext} from "../../contexts/currentUsers";
import useFetch from "../../hooks/useFetch";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import BackendErrorMessages from "../../component/backendErrorMessages";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {responsiveFontSizes} from "@material-ui/core";
import Exit from "@material-ui/icons/ExitToApp";
import useLocalStorage from "../../hooks/useLocalStorage";
import {Redirect} from "react-router-dom";

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
				logout: {
					marginTop: responsiveTheme.spacing(4),
					textAlign: 'center',
				},
				item: {
					marginBottom: responsiveTheme.spacing(4),
				}
			})
});

const Settings = (props) => {
	const classes = useStyles()
	const [currentUserState, dispatch] = useContext(CurrentUserContext)
	const apiUrl = '/user'
	const [{response, error}, doFetch] = useFetch(apiUrl)
	const [image, setImage] = useState('')
	const [username, setUsername] = useState('')
	const [bio, setBio] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [, setToken] = useLocalStorage('token')
	const [isSuccessfulLogout, setIsSuccessfulLogout] = useState(false)

	const handleSubmit = (event) => {
		event.preventDefault()

		doFetch({
			method: 'put',
			data: {
				user: {
					...currentUserState.currentUser,
					image,
					username,
					bio,
					password
				}
			}
		})
	}

	const logout = (event) => {
		event.preventDefault()
		setToken('')
		dispatch({type: 'LOGOUT'})
		setIsSuccessfulLogout(true)
	}

	useEffect(()=>{
		if(!currentUserState.currentUser){
			return
		}
		setImage(currentUserState.currentUser.image)
		setUsername(currentUserState.currentUser.username)
		setBio(currentUserState.currentUser.bio || '')
		setEmail(currentUserState.currentUser.email)
	},[currentUserState.currentUser])

	useEffect(()=>{
		if(!response){
			return
		}
		dispatch({type:'SET_AUTHORIZED', payload: response.user})
	},[response, dispatch])

	if(isSuccessfulLogout) {
		return <Redirect to={'/'} />
	}
	return (
			<Container maxWidth="md">
				<Grid container className={classes.root}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Typography variant="h2" gutterBottom>
								Your settings
							</Typography>
							<form onSubmit={handleSubmit}>
								{error &&
								<Grid container>
									<Grid item xs={12} className={classes.item}>
										<BackendErrorMessages backendErrors={error.errors}/>
									</Grid>
								</Grid>
								}
								<Grid container>
									<Grid item xs={12} className={classes.item}>
										<TextField
												fullWidth
												id="avatar"
												type="text"
												label="Url of profile picture"
												variant="outlined"
												value={image}
												onChange={ e=> setImage(e.target.value) }
										/>
									</Grid>
									<Grid item xs={12} className={classes.item}>
										<TextField
												required
												fullWidth
												id="name"
												type="text"
												label="Username"
												variant="outlined"
												value={username}
												onChange={ e=> setUsername(e.target.value) }
										/>
									</Grid>
									<Grid item xs={12} className={classes.item}>
										<TextField
												fullWidth
												id="bio"
												multiline
												rows={8}
												label="Short bio"
												variant="outlined"
												value={bio}
												onChange={ e=> setBio(e.target.value) }
										/>
									</Grid>
									<Grid item xs={12} className={classes.item}>
										<TextField
												required
												fullWidth
												id="email-input"
												label="Email"
												type="email"
												variant="outlined"
												value={email}
												onChange={ e=> setEmail(e.target.value) }
										/>
									</Grid>
									<Grid item xs={12} className={classes.item}>
										<TextField
												required
												fullWidth
												id="password-input"
												label="Password"
												type="password"
												variant="outlined"
												value={password}
												onChange={ e=> setPassword(e.target.value) }
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
											Save
										</Button>

									</Grid>
								</Grid>
							</form>
						</Paper>
						<div className={classes.logout}>
							<Button
									variant="outlined"
									color="secondary"
									startIcon={<Exit/>}
									onClick={logout}
							>
								Logout
							</Button>
						</div>
					</Grid>
				</Grid>
			</Container>
	)
}


export default Settings;