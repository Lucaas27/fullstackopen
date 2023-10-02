import React from 'react';

function Note({ note, toggleImportanceHandler, deleteNoteHandler }) {
  const label = note.important
    ? 'Set it to not important'
    : 'Set it to important';
  return (
    <li className="note">
      {note.content}
      <button type="button" onClick={() => toggleImportanceHandler(note.id)}>{label}</button>
      <button type="button" onClick={() => deleteNoteHandler(note.id)}>Delete</button>
    </li>
  );
}

export default Note;
