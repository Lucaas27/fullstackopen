import { useEffect, useState } from "react";
import "./App.css";
import CountryForm from "./components/CountryForm";
import DisplayCountryData from "./components/DisplayCountryData";
import NotificationMessage from "./components/NotificationMessage";
import CountryService from "./services/countries";

function App() {
  const [allCountries, setAllCountries] = useState(null);
  const [countriesToBeDisplayed, setCountriesToBeDisplayed] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  const getAllInitialCountries = () => {
    CountryService.getAllCountries().then((allCountriesReturned) => {
      setAllCountries(allCountriesReturned);
    });
  };

  useEffect(getAllInitialCountries, []);

  const CountryInputHandler = (countryInput) => {
    const countriesFound =
      allCountries &&
      allCountries.filter((country) => {
        const countryName = country.name.common.toLocaleUpperCase();
        return countryName.includes(countryInput);
      });

    if (countryInput === "") {
      setCountriesToBeDisplayed(null);
    } else {
      setCountriesToBeDisplayed(countriesFound);
    }
  };

  useEffect(() => {
    if (countriesToBeDisplayed && countriesToBeDisplayed.length > 10) {
      setCountriesToBeDisplayed(null);
      setNotificationMessage("Too many");
    } else {
      setNotificationMessage(null);
    }
  }, [countriesToBeDisplayed]);

  // useEffect(() => {
  //   if (!countriesToBeDisplayed || countriesToBeDisplayed.length < 10) {
  //     setNotificationMessage(null);
  //   }
  //   if (countriesToBeDisplayed && countriesToBeDisplayed.length > 10) {
  //     setNotificationMessage("Too many");
  //   }
  // }, [countriesToBeDisplayed]);

  // useEffect(() => {
  //   // if (countriesToBeDisplayed && countriesToBeDisplayed.length === 1) {
  //   //   CountryService.getCountry(countriesToBeDisplayed[0].name.common).then(
  //   //     (countryFoundInSearch) => console.log(countryFoundInSearch)
  //   //   );
  //   // }
  //   if (!countriesToBeDisplayed || countriesToBeDisplayed.length < 10) {
  //     setNotificationMessage(null);
  //   } else if (countriesToBeDisplayed.length > 10) {
  //     setCountriesToBeDisplayed(null);
  //     setNotificationMessage("Too many matches. Please be more specific.");
  //   }
  // }, [countriesToBeDisplayed]);

  return (
    <>
      <h1>Country Facts</h1>
      <CountryForm CountryInputHandler={CountryInputHandler} />
      {notificationMessage && (
        <NotificationMessage message={notificationMessage} />
      )}
      {countriesToBeDisplayed && (
        <DisplayCountryData countriesToBeDisplayed={countriesToBeDisplayed} />
      )}
    </>
  );
}

export default App;
