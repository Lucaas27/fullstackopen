import React from "react";
import { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import NewContactForm from "./components/NewContactForm";
import DisplayContacts from "./components/DisplayContacts";
import axios from "axios";

function App() {
  const [persons, setPersons] = useState([]);
  const [personsFilter, setPersonsFilter] = useState("");
  const [newContactObj, setNewContactObj] = useState({
    id: "",
    name: "",
    number: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/contacts")
      .then((res) => setPersons(res.data));
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

    const itExists = persons.find(
      (value) => JSON.stringify(value) === JSON.stringify(newContactData)
    );

    const postRequest = axios
      .post("http://localhost:3001/contacts", newContactData)
      .then((res) => {
        setPersons(persons.concat(res.data));
        setNewContactObj({
          name: "",
          number: "",
        });
      });

    !itExists && newContactObj.name !== "" && newContactObj.number !== ""
      ? setPersons(postRequest)
      : alert(
          `The contact ${newContactObj.name} already exists in the phonebook or input is invalid`
        );
    // console.log(itExists, newContactData, persons)
  };

  const filteredPersonList = persons.filter((person) =>
    person.name.toUpperCase().includes(personsFilter.toUpperCase())
  );

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
  );
}

export default App;
