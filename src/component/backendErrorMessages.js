import React from 'react';
import Alert from '@material-ui/lab/Alert';


const BackendErrorMessages = ({backendErrors}) => {
	const errorMessages = Object.keys(backendErrors).map(name => {
		const messages = backendErrors[name].join(' ')
		return `${name} ${messages}`
	})
	return (
		<Alert  variant="outlined" severity="error">
				{errorMessages.map((errorMessage, index) => (
						<div key={errorMessage} style={{textAlign:'left'}}>{index+1}. {errorMessage}</div>
				))
				}
		</Alert>
	)
};

export default BackendErrorMessages;