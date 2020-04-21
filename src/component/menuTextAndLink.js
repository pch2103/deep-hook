import HomeIcon from '@material-ui/icons/Home'
import DescriptionIcon from '@material-ui/icons/Description'
import SingUpIcon from '@material-ui/icons/PersonAdd'
import SingInIcon from '@material-ui/icons/HowToReg'
import LogOut from '@material-ui/icons/PermIdentity'
import React from "react";

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
			"link": "/articles/new",
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