import React from 'react'
import { useState } from 'react'
import SearchFilter from './components/SearchFilter'
import NewContactForm from './components/NewContactForm'
import DisplayContacts from './components/DisplayContacts'

const peopleList = [
	{ id: '1', name: 'Arto Hellas', number: '040-123456' },
	{ id: '2', name: 'Ada Lovelace', number: '39-44-5323523' },
	{ id: '3', name: 'Dan Abramov', number: '12-43-234345' },
	{ id: '4', name: 'Mary Poppendieck', number: '39-23-6423122' },
	{ id: '5', name: 'John Doe', number: '07758899268' },
]

function App() {
	const [persons, setPersons] = useState(peopleList)
	const [personsFilter, setPersonsFilter] = useState('')
	const [newContactObj, setNewContactObj] = useState({
		id: '',
		name: '',
		number: '',
	})

	const newContactNameHandler = (e) =>
		setNewContactObj({ ...newContactObj, name: e.target.value })

	const newContactNumberHandler = (e) =>
		setNewContactObj({ ...newContactObj, number: e.target.value })

	const filterHandler = (e) => {
		setPersonsFilter(e.target.value)
	}

	const submitHandler = (e) => {
		e.preventDefault()
		const newContactData = {
			id: Math.random().toString(),
			name: newContactObj.name,
			number: newContactObj.number,
		}
		const itExists = persons.find(
			(value) => JSON.stringify(value) === JSON.stringify(newContactData)
		)
		!itExists && newContactObj.name !== '' && newContactObj.number !== ''
			? setPersons(persons.concat(newContactData))
			: alert(
					`The contact ${newContactObj.name} already exists in the phonebook or input is invalid`
			  )
		// console.log(itExists, newContactData, persons)
		setNewContactObj({
			id: '',
			name: '',
			number: '',
		})
	}

	const filteredPersonList = persons.filter((person) =>
		person.name.toUpperCase().includes(personsFilter.toUpperCase())
	)

	return (
		<div>
			<h2>Phonebook</h2>
			<SearchFilter filterHandler={filterHandler} />
			<h2>Add new contact</h2>
			<NewContactForm
				submitHandler={submitHandler}
				newContactNameHandler={newContactNameHandler}
				newContactObj={newContactObj}
				newContactNumberHandler={newContactNumberHandler}
			/>
			<h2>Contacts</h2>
			<DisplayContacts filteredPersonList={filteredPersonList} />
		</div>
	)
}

export default App
