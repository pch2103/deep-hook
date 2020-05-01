import React from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import GlobalFeed from "./pages/globalFeed/GlobalFeed"
import Article from "./pages/article/Article"
import Auth from "./pages/auth/Auth"
import TagFeed from "./pages/tagFeed/TagFeed";
import YourFeed from "./pages/yourFeed/YourFeed";
import CreateArticle from "./pages/createArticle/CreateArticle";
import EditArticle from "./pages/editArticle/EditArticle";
import Settings from "./pages/settings/Settings";
import UserProfile from "./pages/userProflle/UserProfile";

const Routes = () => {
	return (
			<BrowserRouter basename='/'>
				<Switch>
					<Route path='/' component={GlobalFeed} exact/>
					<Route path='/profiles/:slug' component={UserProfile} exact/>
					<Route path='/profiles/:slug/favorites' component={UserProfile}/>
					<Route path='/settings' component={Settings}/>
					<Route path='/articles/new' component={CreateArticle}/>
					<Route path='/articles/:slug/edit' component={EditArticle}/>
					<Route path='/feed' component={YourFeed}/>
					<Route path='/tags/:slug' component={TagFeed}/>
					<Route path='/login' component={Auth}/>
					<Route path='/register' component={Auth}/>
					<Route path='/articles/:slug' component={Article}/>
				</Switch>
			</BrowserRouter>

	);
}

export default Routes;