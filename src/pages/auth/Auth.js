import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link as MaterialLink} from "@material-ui/core/";
import {Link, Redirect} from "react-router-dom"
import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";
import {CurrentUserContext} from "../../contexts/currentUsers";
import BackendErrorMessages from "./components/backendErrorMessages";

const useStyles = makeStyles((theme) => (
		{
			root: {
				flexGrow: 1,
				marginTop: theme.spacing(4),
				justifyContent: "center"
			},
			paper: {
				padding: theme.spacing(2),
				textAlign: 'center',
				color: theme.palette.text.secondary,
			},
			item: {
				marginBottom: theme.spacing(4),
			}
		}));

const Auth = (props) => {
	const isLogin = props.match.path === '/login'
	const pageTitle = isLogin ? 'Sing In' : 'Sing Up'
	const descriptionLink = isLogin ? '/register' : '/login'
	const descriptionText = isLogin ? 'Need an account?' : 'Have an account?'
	const apiUrl = isLogin ? '/users/login' : '/users'
	const classes = useStyles()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false)
	const [{isLoading, response, error}, doFetch] = useFetch(apiUrl)
	const [ , setToken] = useLocalStorage('token')
	const [ , setCurrentUserState] = useContext(CurrentUserContext);

	const handleSubmit = (event) => {
		event.preventDefault()
		const user = isLogin ? {email, password} : {email, password, username}
		doFetch({
			method: 'post',
			data: {
				user
			}
		}) //doFetch
	} //handleSubmit

	useEffect(() => {
		if (!response) {
			return
		}
		setToken(response.user.token)
		setIsSuccessfulSubmit(true)
		setCurrentUserState(state =>({
			...state,
			isLoading: false,
			isLoggedIn: true,
			currentUser: response.user
		}))
	}, [response, setToken, setCurrentUserState])

	 if (isSuccessfulSubmit) {
	 	return <Redirect to='/' />
	 }
	return (
			<Container maxWidth="md">
				<Grid container className={classes.root}>
					<Grid item md={8} sm={10} xs={12}>
						<Paper className={classes.paper}>
							<Typography variant="h2" gutterBottom>
								{pageTitle}
							</Typography>
							<MaterialLink to={descriptionLink} component={Link}>
								<Typography variant="h6" gutterBottom>
									{descriptionText}
								</Typography>
							</MaterialLink>
							<form onSubmit={handleSubmit}>
								{error &&
								<Grid container>
									<Grid item xs={12} className={classes.item}>
										<BackendErrorMessages backendErrors={error.errors}/>
									</Grid>
								</Grid>
								}
								<Grid container>
									{!isLogin && (
											<Grid item xs={12} className={classes.item}>
												<TextField
														required
														fullWidth
														id="user-input"
														type="text"
														label="Username"
														variant="outlined"
														value={username}
														onChange={e => setUsername(e.target.value)}
												/>
											</Grid>
									)}
									<Grid item xs={12} className={classes.item}>
										<TextField
												required
												fullWidth
												id="email-input"
												label="Email"
												type="email"
												variant="outlined"
												value={email}
												onChange={e => setEmail(e.target.value)}
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
												onChange={e => setPassword(e.target.value)}
										/>
									</Grid>
									<Grid item xs={12}>
										<Button
												variant="contained"
												size="large"
												type="submit"
												color="primary"
												disabled={isLoading}
										>
											{pageTitle}
										</Button>
									</Grid>
								</Grid>
							</form>
						</Paper>
					</Grid>
				</Grid>
			</Container>
	);
};

export default Auth;
