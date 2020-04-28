import React, {useContext, useEffect, useState} from 'react';
import ArticleForm from "../../component/articleForm";
import useFetch from "../../hooks/useFetch";
import {Redirect} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/currentUsers";

const EditArticle = ({match}) => {
	const slug = match.params.slug
	const apiUrl = `/articles/${slug}`
	const [{response: fetchArticleResponse}, doFetchArticle] = useFetch(apiUrl)
	const [
		{response: updateArticleResponse, error: updateArticleError},
		doUpdateArticle] = useFetch(apiUrl)
	const [initialValues, setInitialValues] = useState(null)
	const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false)
	const [currentUserState] = useContext(CurrentUserContext)

	const handleSubmit = article => {
		doUpdateArticle({
			method: 'put',
			data: {
				article
			}
		})
	}

	useEffect(() => {
		doFetchArticle()
	}, [doFetchArticle])

	useEffect(() => {
		if (!fetchArticleResponse) {
			return
		}
		setInitialValues({
			title: fetchArticleResponse.article.title,
			body: fetchArticleResponse.article.body,
			description: fetchArticleResponse.article.description,
			tagList: fetchArticleResponse.article.tagList,
		})
	}, [fetchArticleResponse])

	useEffect(() => {
		if(!updateArticleResponse) {
			return
		}
		setIsSuccessfulSubmit(true)
	},[updateArticleResponse])

	if (currentUserState.isLoggedIn === false) {
		return  <Redirect to='/' />
	}

	if (isSuccessfulSubmit) {
		return <Redirect to={`/articles/${slug}`}/>
	}

	return (
			<div>
				{initialValues &&
				<ArticleForm
						onSubmit={handleSubmit}
						errors={(
								updateArticleError && updateArticleError.errors) || ''}
						initialValues={initialValues}
				/>
				}
			</div>
	)
}


export default EditArticle;