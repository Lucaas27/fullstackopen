import React from "react";
import Note from "./components/Note";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [notesList, setNotesList] = useState([]);
  const [enteredNote, setEnteredNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    // console.log("useEffect fired");
    axios.get("http://localhost:3001/notes").then((res) => {
      //   console.log(res);
      setNotesList(res.data);
    });
  };

  useEffect(hook, []);
  //   console.log("render", notesList.length, "notes");

  const enteredNoteHandler = (e) => setEnteredNote(e.target.value);

  const filteredNotes = showAll
    ? notesList
    : notesList.filter((note) => note.important);
  const filterHandler = () => setShowAll(!showAll);

  // console.log(enteredNote)

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const newNoteData = {
      content: enteredNote,
      important: Math.random() < 0.5,
    };

    // setNotesList([...notesList, newNoteData]))
    // console.log(newNoteData)
    // console.log(notesList)
    axios.post("http://localhost:3001/notes", newNoteData).then((res) => {
      // console.log(res.data);
      setNotesList(notesList.concat(res.data));
      setEnteredNote("");
    });
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={filterHandler}>
          Showing {showAll ? "all" : "important"} notes
        </button>
      </div>
      <ul>
        {filteredNotes.map((note) => (
          <Note key={note.id} note={note} />
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
    </div>
  );
};

export default App;
