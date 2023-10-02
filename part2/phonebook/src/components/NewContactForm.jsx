import React from 'react'

const NewContactForm = ({
	submitHandler,
	newContactNameHandler,
	newContactObj,
	newContactNumberHandler,
}) => {
	return (
		<form onSubmit={submitHandler}>
			<div>
				Name:{' '}
				<input onChange={newContactNameHandler} value={newContactObj.name} />
			</div>
			<div>
				Number:{' '}
				<input
					onChange={newContactNumberHandler}
					value={newContactObj.number}
				/>
			</div>
			<div>
				<button type="submit">Add</button>
			</div>
		</form>
	)
}

export default NewContactForm
