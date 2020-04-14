import React from 'react'
import {Switch, Route} from 'react-router-dom'
import GlobalFeed from "./pages/globalFeed/GlobalFeed"
import Article from "./pages/article/Article"
import Auth from "./pages/auth/Auth"

const Routes = () => {
	return (
		<Switch>
			<Route path='/' component={GlobalFeed} exact />
			<Route path='/login' component={Auth} />
			<Route path='/register' component={Auth} />
			<Route path='/articles/:slug' component={Article} />
		</Switch>
	);
}

export default Routes;