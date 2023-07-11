import React from 'react';

function SearchFilter({ filterHandler }) {
  return (
    <div>
      Search:
      {' '}
      <input type="text" aria-label="Search" onChange={filterHandler} />
    </div>
  );
}

export default SearchFilter;
