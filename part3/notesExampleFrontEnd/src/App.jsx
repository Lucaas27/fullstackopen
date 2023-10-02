import React from 'react'
import Note from './components/Note'
import Notifications from './components/Notifications'
import Footer from './components/Footer'
import { useState, useEffect } from 'react'
import noteService from './services/notes'
import './index.css'

const App = () => {
	const [notesList, setNotesList] = useState([])
	const [enteredNote, setEnteredNote] = useState('')
	const [showAll, setShowAll] = useState(true)
	const [notification, setNotification] = useState({
		message: null,
		status: null,
	})

	/**************** Get list of notes when page loads ***************/
	useEffect(() => {
		// console.log("useEffect fired");
		noteService
			.getAll()
			.then((initialNotes) => {
				//   console.log(res);
				setNotesList(initialNotes)
			})
			.catch((error) => console.log(error.message))
	}, [])

	// console.log("render", notesList.length, "notes");

	const enteredNoteHandler = (e) => setEnteredNote(e.target.value)

	const filteredNotes = showAll
		? notesList
		: notesList.filter((note) => note.important)

	const filterHandler = () => setShowAll(!showAll)

	const notifications = (message, status) => {
		setNotification({
			message: message,
			status: status,
		})
		setTimeout(() => {
			setNotification({
				message: null,
				status: null,
			})
		}, 2500)
	}

	/**************** Update note importance ***************/
	const toggleImportanceHandler = (id) => {
		const currentNote = notesList.find((n) => n.id === id)
		const modifiedNote = { ...currentNote, important: !currentNote.important }

		noteService
			.update(id, modifiedNote)
			.then((returnedNote) => {
				//if the note is not the targeted one, it will remain the same. Otherwise the note will be replaced
				setNotesList(notesList.map((n) => (n.id !== id ? n : returnedNote)))
				notifications(`The note has been updated`, `success`)
			})
			.catch((error) => {
				// console.log(error.message);
				notifications(`The note couldn't be updated`, `error`)
				setNotesList(notesList.map((n) => n.id !== id))
			})
	}

	/**************** Delete note ***************/
	const deleteNoteHandler = (id) => {
		window.confirm(`Are you sure you want to delete the note?`) &&
			noteService
				.remove(id)
				.then(() => {
					//if the note is not the targeted one, it will remain the same. Otherwise the note will be deleted
					setNotesList(notesList.filter((n) => n.id !== id))
					notifications(`The note has been deleted`, 'success')
				})
				.catch((error) => {
					notifications(`The note couldn't be deleted`, 'error')
					console.log(error)
				})
	}

	/**************** Create new notes ***************/
	const formSubmitHandler = (e) => {
		e.preventDefault()

		const newNoteData = {
			content: enteredNote,
			important: Math.random() < 0.5,
		}

		noteService
			.create(newNoteData)
			.then((newNoteReturned) => {
				// console.log(res.data);
				setNotesList(notesList.concat(newNoteReturned))
				setEnteredNote('')
			})
			.catch((error) => {
				notifications(`${error.data}`, 'error')
				console.log(error)
			})
	}

	return (
		<div>
			<h1>Notes</h1>
			<Notifications
				message={notification.message}
				status={notification.status}
			/>
			<div>
				<button onClick={filterHandler}>
					Click to show {showAll ? 'important' : 'all'} notes
				</button>
			</div>
			<ul>
				{filteredNotes.map((note) => (
					<Note
						key={note.id}
						note={note}
						toggleImportanceHandler={toggleImportanceHandler}
						deleteNoteHandler={deleteNoteHandler}
					/>
				))}
			</ul>
			<form onSubmit={formSubmitHandler}>
				<input
					type="text"
					onChange={enteredNoteHandler}
					value={enteredNote}
					placeholder="Enter new note"
				/>
				<button type="submit">Save</button>
			</form>
			<Footer />
		</div>
	)
}

export default App
