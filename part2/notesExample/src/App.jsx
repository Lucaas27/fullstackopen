import React from 'react'
import Note from './components/Note'
import { useState } from 'react'

const notes = [
	{
		id: 1,
		content: 'HTML is easy',
		important: true,
	},
	{
		id: 2,
		content: 'Browser can execute only JavaScript',
		important: false,
	},
	{
		id: 3,
		content: 'GET and POST are the most important methods of HTTP protocol',
		important: true,
	},
]

const App = () => {
	const [notesList, setNotesList] = useState(notes)
	const [enteredNote, setEnteredNote] = useState('')
	const [showAll, setShowAll] = useState(true)

	const enteredNoteHandler = (e) => {
		setEnteredNote(e.target.value)
	}

	// console.log(enteredNote)

	const formSubmitHandler = (e) => {
		e.preventDefault()
		const newNoteData = {
			id: Math.random(),
			content: enteredNote,
			important: Math.random() < 0.5,
		}
		setNotesList(notesList.concat(newNoteData)) // setNotesList([...notesList, newNoteData]))
		// console.log(newNoteData)
		// console.log(notesList)
		setEnteredNote('')
	}

	return (
		<div>
			<h1>Notes</h1>
			<ul>
				{notesList.map((note) => (
					<Note key={note.id} note={note} />
				))}
			</ul>
			<form onSubmit={formSubmitHandler}>
				<input type="text" onChange={enteredNoteHandler} value={enteredNote} />
				<button type="submit">Save</button>
			</form>
		</div>
	)
}

export default App
