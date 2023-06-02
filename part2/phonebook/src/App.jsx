import React from "react";
import { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import NewContactForm from "./components/NewContactForm";
import DisplayContacts from "./components/DisplayContacts";
import contactService from "./services/contacts";

function App() {
  const [persons, setPersons] = useState([]);
  const [personsFilter, setPersonsFilter] = useState("");
  const cleanContact = {
    id: "",
    name: "",
    number: "",
  };
  const [newContactObj, setNewContactObj] = useState(cleanContact);

  useEffect(() => {
    contactService
      .getAll()
      .then((initialContacts) => setPersons(initialContacts))
      .catch((error) => console.log(error.message));
  }, []);

  const newContactNameHandler = (e) =>
    setNewContactObj({ ...newContactObj, name: e.target.value });

  const newContactNumberHandler = (e) =>
    setNewContactObj({ ...newContactObj, number: e.target.value });

  const filterHandler = (e) => {
    setPersonsFilter(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const newContactData = {
      name: newContactObj.name,
      number: newContactObj.number,
    };

    /****This will search for an object in the persons array with the exact id, name and number */
    // const itExists = persons.find(
    //   (value) => JSON.stringify(value) === JSON.stringify(newContactData)
    // );

    /***** This will seach the persons array for an object with the same name only */
    const itExists = persons.find(
      (value) => value.name === newContactData.name
    );

    if (newContactObj.name === "" || newContactObj.number === "") {
      let invalidInputMessage;
      if (newContactObj.name === "" && newContactObj.number === "") {
        invalidInput = alert(`The inputs are invalid`);
      } else {
        invalidInput =
          newContactObj.name === ""
            ? alert(`The name input is invalid`)
            : alert(`The number input is invalid`);
      }
      return invalidInputMessage;
    }
    if (itExists) {
      const modifiedContact = { ...itExists, number: newContactObj.number };
      window.confirm(
        `The contact ${newContactObj.name} already exists in the phonebook. Would you like to replace the phone number?`
      ) &&
        contactService.update(itExists.id, modifiedContact).then(() => {
          setPersons(
            persons.map((p) => (p.id === itExists.id ? modifiedContact : p))
          );
          setNewContactObj(cleanContact);
        });
    } else {
      contactService.create(newContactData).then((newContact) => {
        setPersons(persons.concat(newContact));
        setNewContactObj(cleanContact);
      });
    }
  };

  const filteredPersonList = persons.filter((person) =>
    person.name.toUpperCase().includes(personsFilter.toUpperCase())
  );

  const deleteContactHandler = (id) => {
    window.confirm("Are you sure want to delete this contact?") &&
      contactService
        .deleteContact(id)
        .then(() => setPersons(persons.filter((p) => p.id !== id)))
        .catch((error) => {
          console.log(error.message);
          alert(`The contact does not exist in the database`);
        });
  };

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
      <DisplayContacts
        filteredPersonList={filteredPersonList}
        deleteContactHandler={deleteContactHandler}
      />
    </div>
  );
}

export default App;
