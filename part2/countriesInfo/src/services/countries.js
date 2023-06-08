import axios from "axios";
const baseUrl = "https://restcountries.com/v3.1/";
const WEATHER_API = import.meta.env.VITE_WEATHER_API //weatherapi.com

// const getCountry = (countryName) => {
//   return axios
//     .get(`${baseUrl}/name/${countryName}`)
//     .then((countryFound) => countryFound.data);
// };

const getAllCountries = () => {
  return axios
    .get(`${baseUrl}/all`)
    .then((countries) => countries.data);
};

const getWeather = (capital) => {
  return axios.get(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API}&q=${capital}`)
    .then(res => res.data)
}

export default {
  // getCountry,
  getAllCountries,
  getWeather
};
