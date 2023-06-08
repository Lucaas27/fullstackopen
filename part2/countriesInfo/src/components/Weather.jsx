import React, { useState } from 'react'
import CountryService from '../services/countries'

const Weather = ({ capital }) => {
	const [weather, setWeather] = useState({
		temp: '',
		img: '',
		feelsLike: '',
		wind: '',
		desc: '',
	})
	CountryService.getWeather(capital).then((weather) =>
		setWeather({
			temp: weather.current.temp_c,
			img: weather.current.condition.icon,
			feelsLike: weather.current.feelslike_c,
			wind: weather.current.wind_mph,
			desc: weather.current.condition.text,
		})
	)
	return (
		<>
			<h4>Current Weather in {capital}</h4>
			<div>
				<p>Temperature: {weather.temp} °C</p>
				<p>Feels Like: {weather.feelsLike} °C</p>
				<p>Wind: {weather.wind} mph</p>
				<p>Conditions: {weather.desc}</p>
				<img src={weather.img} alt="" />
			</div>
		</>
	)
}

export default Weather
