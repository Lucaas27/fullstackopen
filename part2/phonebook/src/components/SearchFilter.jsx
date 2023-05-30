import React from 'react'

const SearchFilter = ({ filterHandler }) => {
	return (
		<div>
			Search: <input type="text" onChange={filterHandler} />
		</div>
	)
}

export default SearchFilter
