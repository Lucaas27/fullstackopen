import React from 'react'

const Note = ({ note, toggleImportanceHandler, deleteNoteHandler }) => {
	const label = note.important
		? 'Set it to not important'
		: 'Set it to important'
	return (
		<li className="note">
			{note.content}
			<button onClick={() => toggleImportanceHandler(note.id)}>{label}</button>
			<button onClick={() => deleteNoteHandler(note.id)}>Delete</button>
		</li>
	)
}

export default Note
