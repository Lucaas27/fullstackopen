import React from "react";
import Note from "./components/Note";
import Notifications from "./components/Notifications";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import noteService from "./services/notes";
import "./index.css";

const App = () => {
  const [notesList, setNotesList] = useState([]);
  const [enteredNote, setEnteredNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState({
    message: null,
    status: null,
  });

  /**************** Get list of notes when page loads ***************/
  useEffect(() => {
    // console.log("useEffect fired");
    noteService
      .getAll()
      .then((initialNotes) => {
        //   console.log(res);
        setNotesList(initialNotes);
      })
      .catch((error) => console.log(error.message));
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

    noteService
      .update(id, modifiedNote)
      .then((returnedNote) => {
        //if the note is not the targeted one, it will remain the same. Otherwise the note will be replaced
        setNotesList(notesList.map((n) => (n.id !== id ? n : returnedNote)));
      })
      .catch((error) => {
        // console.log(error.message);
        setNotification({
          message: `The note "${modifiedNote.content} " was already deleted from the server`,
          status: "error",
        });
        setTimeout(() => {
          setNotification({
            message: null,
            status: null,
          });
        }, 2500);

        setNotesList(notesList.filter((n) => n.id !== id));
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
    noteService
      .create(newNoteData)
      .then((newNoteReturned) => {
        // console.log(res.data);
        setNotesList(notesList.concat(newNoteReturned));
        setEnteredNote("");
        // setNotification({
        //   message: `Note "${newNoteReturned.content}" has been added to the list`,
        //   status: "success",
        // });
        // setTimeout(() => {
        //   setNotification({
        //     message: null,
        //     status: null,
        //   });
        // }, 2500);
      })
      .catch((error) => {
        setNotification({ message: `${error.data}`, status: "error" });
        setTimeout(() => {
          setNotification({ message: null, status: null });
        }, 2500);
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notifications
        message={notification.message}
        status={notification.status}
      />
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
      <Footer />
    </div>
  );
};

export default App;
