import React from 'react'
import {Switch, Route} from 'react-router-dom'
import GlobalFeed from "./pages/globalFeed/GlobalFeed"
import Article from "./pages/article/Article"
import Auth from "./pages/auth/Auth"
import TagFeed from "./pages/tagFeed/TagFeed";
import YourFeed from "./pages/yourFeed/YourFeed";

const Routes = () => {
	return (
		<Switch>
			<Route path='/' component={GlobalFeed} exact />
			<Route path='/feed' component={YourFeed} />
			<Route path='/tags/:slug' component={TagFeed} />
			<Route path='/login' component={Auth} />
			<Route path='/register' component={Auth} />
			<Route path='/articles/:slug' component={Article} />
		</Switch>
	);
}

export default Routes;