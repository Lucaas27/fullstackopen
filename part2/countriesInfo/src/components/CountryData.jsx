import React from 'react'
import Weather from './Weather'

const CountryData = ({ results }) => {
	return (
		<div className="results">
			<h2 className="title">{results.name.common}</h2>
			<div className="results-facts">
				<div className="results-facts__left">
					<p>Capital : {results.capital}</p>
					<p>Area : {new Intl.NumberFormat().format(results.area)} km²</p>
					<p>
						Population : {new Intl.NumberFormat().format(results.population)}
					</p>
					<p>
						Driving side :{' '}
						{results.car.side.charAt(0).toUpperCase() +
							results.car.side.slice(1)}
					</p>
					<h4>Currency</h4>
					<ul>
						{Object.keys(results.currencies).map((c, i) => (
							<li key={i}>
								{results.currencies[c].name} ({results.currencies[c].symbol})
							</li>
						))}
					</ul>
					<h4>Languages</h4>
					<ul>
						{Object.keys(results.languages).map((l, i) => (
							<li key={i}>{results.languages[l]}</li>
						))}
					</ul>
					<h4>Region</h4>
					<p>{results.subregion}</p>
				</div>
				<div className="results-facts__right">
					<Weather capital={results.capital} />
				</div>
			</div>

			<img
				className="responsive"
				src={results.flags.svg}
				alt={results.flags.alt}
			/>
		</div>
	)
}

export default CountryData
