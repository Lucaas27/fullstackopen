import React from 'react'

const DisplayContacts = ({ filteredPersonList }) => {
	return filteredPersonList.map((person) => {
		return (
			<div key={person.id}>
				<p>
					{person.name} - {person.number}
				</p>
			</div>
		)
	})
}

export default DisplayContacts
