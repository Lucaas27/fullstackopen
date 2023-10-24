import { useEffect, useState } from 'react'
import './App.css'
import CountryForm from './components/CountryForm'
import Results from './components/Results'
import CountryService from './services/countries'

function App() {
	const [results, setResults] = useState([]) // array to be displayed
	const [countries, setCountries] = useState([]) // array to store all countries
	const [searchTerm, setSearchTerm] = useState('') // state to store search terms received from the form

	// useEffect(() => {
	// 	console.log('App rendered')
	// 	console.log(`Length of results array: ${results.length}`)
	// 	console.log(`Value of search state: ${searchTerm}`)
	// })

	useEffect(() => {
		CountryService.getAllCountries().then(setCountries)
	}, [])

	useEffect(() => {
		if (searchTerm) {
			setResults(
				countries.filter((country) =>
					country.name.common.toLocaleUpperCase().includes(searchTerm)
				)
			)
		}
	}, [searchTerm])

	const CountryInputHandler = (countryInput) => {
		// console.log('Setting search term to input value')
		countryInput !== '' ? setSearchTerm(countryInput) : setResults([])
	}

	return (
		<div>
			<h1>Country Facts</h1>
			<CountryForm CountryInputHandler={CountryInputHandler} />
			<Results results={results} />
		</div>
	)
}

export default App
