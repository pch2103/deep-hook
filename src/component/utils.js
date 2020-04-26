import HomeIcon from '@material-ui/icons/Home'
import DescriptionIcon from '@material-ui/icons/Description'
import SingUpIcon from '@material-ui/icons/PersonAdd'
import SingInIcon from '@material-ui/icons/HowToReg'
import LogOut from '@material-ui/icons/PermIdentity'
import React from "react";
import {parse} from 'query-string' // parse Urls https://www.npmjs.com/package/query-string

//Variables and Constant
export const limit = 10 //item per sting

export const getPaginator = search => {
	const parsedSearch = parse(search) // '?foo=bar' => {foo: 'bar'}
	const currentPage = parsedSearch.page ? Number(parsedSearch.page) : 1
	const offset = currentPage*10 - limit

	return {currentPage, offset}
}

// Menu
export const menuWithLogin = [
	{
		"text": "To Home",
		"link": "/",
		"icon": <HomeIcon/>
	},
	{
		"text": "Sing In",
		"link": "/login",
		"icon": <SingInIcon/>
	},
	{
		"text": "Sing Up",
		"link": "/register",
		"icon": <SingUpIcon/>
	},
]

export const menuWithUser = ({currentUser}) => {
return [
		{
			"text": "To Home",
			"link": "/",
			"icon": <HomeIcon/>
		},
		{
			"text": "New Post",
			"link": "/posts",
			"icon": <DescriptionIcon/>
		},
		{
			"text": "User: " + currentUser.username,
			"link": "/profiles/" + currentUser.username,
			"icon": <LogOut/>,
			"avatar": currentUser.image
		},
	]
}