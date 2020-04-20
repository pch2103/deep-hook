import React from 'react'
import {render} from 'react-dom'
import 'typeface-roboto';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import {BrowserRouter} from "react-router-dom"
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

	return (
			<div>
				<CurrentUserProvider>
					<CurrentUserChecker>
						<ThemeProvider theme={darkTheme}>
							<CssBaseline/>
							<BrowserRouter basename="/deep-hook">
								<TopBar/>
								<Routes/>
							</BrowserRouter>
						</ThemeProvider>
					</CurrentUserChecker>
				</CurrentUserProvider>
			</div>
	)
}

render(<App/>, document.getElementById('root')
);

