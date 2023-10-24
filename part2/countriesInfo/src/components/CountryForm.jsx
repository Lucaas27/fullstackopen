import React from 'react'

const CountryForm = ({ CountryInputHandler }) => {
	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<label htmlFor="countryName">Find Country </label>
			<input
				id="countryName"
				name="countryName"
				type="text"
				onChange={(e) =>
					CountryInputHandler(e.target.value.toLocaleUpperCase())
				}
			/>
		</form>
	)
}

export default CountryForm
