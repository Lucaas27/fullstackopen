import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAllCountries = () => {
  return axios.get(`${baseUrl}/all`).then((countries) => countries.data);
};

const getCountry = (countryName) => {
  return axios
    .get(`${baseUrl}/name/${countryName}`)
    .then((countryFound) => countryFound.data);
};

export default {
  getAllCountries,
  getCountry,
};
