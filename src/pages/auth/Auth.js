import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link as MaterialLink} from "@material-ui/core/";
import {Link} from "react-router-dom"


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
				marginTop: theme.spacing(4),
			}
		}));

const Auth = () => {
	const classes = useStyles();
	return (
			<Container maxWidth="md">
				<Grid container className={classes.root}>
					<Grid item md={8} sm={10} xs={12}>
						<Paper className={classes.paper}>
							<Typography variant="h2" gutterBottom>
								Login
							</Typography>
							<MaterialLink to="/register" component={Link}>
								<Typography variant="h6" gutterBottom>
									Need an account?
								</Typography>
							</MaterialLink>
							<br/>
							<Grid container>
								<Grid item xs={12}>
									<TextField
											required
											fullWidth
											id="email-input"
											label="Email"
											type="email"
											variant="outlined"
									/>
								</Grid>
								<Grid item xs={12} className={classes.item}>
									<TextField
											required
											fullWidth
											id="password-input"
											label="Password"
											type="password"
											autoComplete="current-password"
											variant="outlined"
									/>
									<Grid item xs={12} className={classes.item}>
										<Button
												variant="contained"
												size="large"
												color="primary">
											Sign in
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Container>
	);
};

export default Auth;
