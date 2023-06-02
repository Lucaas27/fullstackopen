import React from "react";
import Note from "./components/Note";
import { useState, useEffect } from "react";
import noteService from "./services/notes";

const App = () => {
  const [notesList, setNotesList] = useState([]);
  const [enteredNote, setEnteredNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  /**************** Get list of notes when page loads ***************/
  useEffect(() => {
    // console.log("useEffect fired");
    noteService.getAll().then((initialNotes) => {
      //   console.log(res);
      setNotesList(initialNotes);
    });
  }, []);

  // console.log("render", notesList.length, "notes");

  const enteredNoteHandler = (e) => setEnteredNote(e.target.value);

  const filteredNotes = showAll
    ? notesList
    : notesList.filter((note) => note.important);

  const filterHandler = () => setShowAll(!showAll);

  /**************** Update note importance ***************/
  const toggleImportanceHandler = (id) => {
    const currentNote = notesList.find((n) => n.id === id);
    const modifiedNote = { ...currentNote, important: !currentNote.important };

    noteService.update(id, modifiedNote).then((returnedNote) => {
      //if the note is not the targeted one, it will remain the same. Otherwise the note will be replaced
      setNotesList(notesList.map((n) => (n.id !== id ? n : returnedNote)));
    });
  };

  /**************** Post new notes ***************/
  const formSubmitHandler = (e) => {
    e.preventDefault();

    const newNoteData = {
      content: enteredNote,
      important: Math.random() < 0.5,
    };

    // setNotesList([...notesList, newNoteData]))
    // console.log(newNoteData)
    // console.log(notesList)
    noteService.create(newNoteData).then((newNoteReturned) => {
      // console.log(res.data);
      setNotesList(notesList.concat(newNoteReturned));
      setEnteredNote("");
    });
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={filterHandler}>
          Click to show {showAll ? "important" : "all"} notes
        </button>
      </div>
      <ul>
        {filteredNotes.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportanceHandler={toggleImportanceHandler}
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
    </div>
  );
};

export default App;
