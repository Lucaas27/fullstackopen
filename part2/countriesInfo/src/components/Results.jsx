/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import CountryData from './CountryData'
import ShowCountry from './ShowCountry'

const Results = ({ results }) => {
	// useEffect(() => {
	// 	console.log('Results component rendered')
	// })

	const [countryClicked, setCountryClicked] = useState({
		isOpen: false,
		name: '',
	})

	const onClickHandler = (country) => {
		if (countryClicked.name === country && countryClicked.isOpen) {
			setCountryClicked({ isOpen: false, name: country })
		} else {
			setCountryClicked({ isOpen: true, name: country })
		}
	}

	if (results.length === 1) {
		const country = results[0]
		return <CountryData results={country} />
	}
	if (results.length <= 10) {
		return (
			<>
				{results.map((country) => {
					return (
						<div key={country.name.common}>
							<p>
								{country.name.common}
								<button onClick={() => onClickHandler(country)}>
									{countryClicked.name === country && countryClicked.isOpen
										? 'Close'
										: 'Show'}
								</button>
							</p>
						</div>
					)
				})}
				{countryClicked.name && (
					<ShowCountry
						isOpen={countryClicked.isOpen}
						closeHandler={() =>
							setCountryClicked({ ...countryClicked, isOpen: false })
						}
					>
						<CountryData results={countryClicked.name} />
					</ShowCountry>
				)}
			</>
		)
	} else {
		return <p>Too many results. Please be more specific.</p>
	}
}

export default Results
