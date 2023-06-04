import React from "react";

const DisplayCountryData = ({ countriesToBeDisplayed }) => {
  return countriesToBeDisplayed.map((country) => {
    return (
      <div key={country.name.common}>
        <p>{country.name.common}</p>
      </div>
    );
  });
};

export default DisplayCountryData;
