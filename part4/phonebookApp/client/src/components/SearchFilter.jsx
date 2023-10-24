import React from 'react';

function SearchFilter({ filterHandler }) {
  return (
    <div className="search-contact-form">
      <input type="text" aria-label="Search" onChange={filterHandler} placeholder="Search" />
    </div>
  );
}

export default SearchFilter;
