import React from "react";

const Note = ({ note, toggleImportanceHandler }) => {
  const label = note.important
    ? "Set it to not important"
    : "Set it to important";
  return (
    <li className="note">
      {note.content}
      <button onClick={() => toggleImportanceHandler(note.id)}>{label}</button>
    </li>
  );
};

export default Note;
