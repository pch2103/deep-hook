import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import useLocalStorage from "./useLocalStorage";

export default url => {
	const baseUrl = 'https://conduit.productionready.io/api'
	const [isLoading, setIsLoading] = useState(false)
	const [response, setResponse] = useState(null)
	const [error, setError] = useState(null)
	const [options, setOptions] = useState({})
	const [token] = useLocalStorage('token')

	const doFetch = useCallback((options = {}) => {
		setOptions(options)
		setIsLoading(true)
	},[])

	useEffect(() => {
		const requestOptions = {
			...options,
			...{
				headers: {
					authorization: token ? `Token ${token}` : ''
				}
			}
		}
		if (!isLoading) {
			return
		}
		axios(baseUrl + url, requestOptions)
				.then(result => {
					// console.log('SUCCESS', result)
					setIsLoading(false)
					setResponse(result.data)
				})
				.catch(error => {
					// console.log('ERROR', error)
					setIsLoading(false)
					setError(error.response.data)
				})
	}, [isLoading, options, token, url]) //useEffect

	return [{isLoading, response, error}, doFetch]
}