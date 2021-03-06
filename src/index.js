import React from 'react'
import {render} from 'react-dom'
import 'typeface-roboto';
import {
	createMuiTheme,
	ThemeProvider,
	responsiveFontSizes
} from '@material-ui/core/styles'

import {HashRouter} from "react-router-dom"
import TopBar from "./component/topBar"
import Routes from "./routes"
import {lightGreen, deepOrange} from "@material-ui/core/colors"
import CssBaseline from "@material-ui/core/CssBaseline"
import {CurrentUserProvider} from "./contexts/currentUsers";
import CurrentUserChecker from "./component/currentUserChecker";

const App = () => {
	const darkTheme = createMuiTheme({
		palette: {
			type: 'dark',
			primary: lightGreen,
			secondary: deepOrange
		},
	});
	const theme = responsiveFontSizes(darkTheme);

	return (
			<div>
				<HashRouter basename='/'>
					<CurrentUserProvider>
						<CurrentUserChecker>
							<ThemeProvider theme={theme}>
								<CssBaseline/>
								<TopBar/>
								<Routes/>
							</ThemeProvider>
						</CurrentUserChecker>
					</CurrentUserProvider>
				</HashRouter>
			</div>
	)
}

render(<App/>, document.getElementById('root')
);

