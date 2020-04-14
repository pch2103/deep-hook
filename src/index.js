import React from 'react'
import {render} from 'react-dom'

import 'typeface-roboto';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import {BrowserRouter} from "react-router-dom"
import TopBar from "./component/topBar"
import Routes from "./routes"
import {lightGreen, deepOrange} from "@material-ui/core/colors"
import CssBaseline from "@material-ui/core/CssBaseline"


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
				<ThemeProvider theme={darkTheme}>
					<CssBaseline />
					<BrowserRouter>
						<TopBar/>
						<Routes/>
					</BrowserRouter>
				</ThemeProvider>
			</div>
	)
}

render(<App/>,document.getElementById('root')
);

