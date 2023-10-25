import React, { useState, useEffect } from 'react';
import SearchFilter from './components/SearchFilter';
import NewContactForm from './components/NewContactForm';
import DisplayContacts from './components/DisplayContacts';
import Notification from './components/Notification';
import contactService from './services/contacts';
import Pagination from './components/Pagination';

import './index.css';

function App() {
  const [persons, setPersons] = useState([]);
  const [personsFilter, setPersonsFilter] = useState('');
  const cleanContact = {
    id: '',
    name: '',
    number: '',
  };
  const [newContactObj, setNewContactObj] = useState(cleanContact);
  const [notification, setNotification] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5; // Set the number of contacts to display per page
  const [contactCount, setContactCount] = useState('');

  useEffect(() => {
    contactService
      .getAll()
      .then((initialContacts) => setPersons(initialContacts))
      .catch((error) => console.log(error.message));
  }, []);

  useEffect(() => {
    contactService
      .fetchContactCount()
      .then((amount) => {
        setContactCount(amount);
      })
      .catch((error) => console.log(error.message));
  }, [persons]);

  const newContactNameHandler = (e) => setNewContactObj({ ...newContactObj, name: e.target.value });

  const newContactNumberHandler = (e) => setNewContactObj({
    ...newContactObj, number: e.target.value,
  });

  const filterHandler = (e) => {
    setPersonsFilter(e.target.value);
  };

  const notifications = (message, status) => {
    setNotification({
      message,
      status,
    });
    setTimeout(() => {
      setNotification({
        message: null,
        status: null,
      });
    }, 3000);
  };

  const confirmation = (question) => window.confirm(question);

  const submitHandler = (e) => {
    e.preventDefault();

    const newContactData = {
      name: newContactObj.name,
      number: newContactObj.number,
    };

    /** **This will search for an object in the persons array with the exact id, name and number */
    // const itExists = persons.find(
    //   (value) => JSON.stringify(value) === JSON.stringify(newContactData)
    // );

    /** *** This will search the persons array for an object with the same name only */
    const itExists = persons
      .find((value) => value.name.toUpperCase() === newContactData.name.toUpperCase());

    if (newContactObj.name === '' || newContactObj.number === '') {
      let invalidInputMessage;
      if (newContactObj.name === '' && newContactObj.number === '') {
        invalidInputMessage = notifications('The inputs are invalid', 'error');
      } else {
        invalidInputMessage = newContactObj.name === '' ? notifications('The name input is invalid', 'error') : notifications('The number input is invalid', 'error');
      }
      return invalidInputMessage;
    }
    if (itExists) {
      const modifiedContact = { ...itExists, number: newContactObj.number };
      if (confirmation(
        `The contact ${newContactObj.name} already exists in the phonebook. Would you like to replace the phone number?`,
      )) {
        contactService.update(itExists.id, modifiedContact)
          .then(() => {
            setPersons(
              persons.map((p) => (p.id === itExists.id ? modifiedContact : p)),
            );
            setNewContactObj(cleanContact);
          })
          .then(() => {
            notifications(
              `${modifiedContact.name}'s contact number has been updated`,
              'success',
            );
          })
          .catch(() => {
            notifications(
              ` Information for ${itExists.name} has already been modified or deleted in the server. Try again`,
              'error',
            );
            contactService
              .getAll()
              .then((updatedContacts) => setPersons(updatedContacts));
          });
      }
    } else {
      contactService
        .create(newContactData)
        .then((newContact) => {
          // setPersons(persons.concat(newContact));
          setPersons([newContact, ...persons]);
          setNewContactObj(cleanContact);
        })
        .then(() => {
          notifications(`Added ${newContactData.name}.`, 'success');
        })
        .catch((error) => notifications(error.response.data.reason, 'error'));
    }
    return null;
  };

  // Pagination
  const filteredPersonList = persons.filter(
    (person) => person.name.toUpperCase().includes(personsFilter.toUpperCase()),
  );
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredPersonList.slice(indexOfFirstContact, indexOfLastContact);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const deleteContactHandler = (id) => {
    const contactToDelete = persons.find((p) => p.id === id);
    if (confirmation(
      `Are you sure you want to delete ${contactToDelete.name}'s contact?`,
    )) {
      contactService
        .deleteContact(id)
        .then(() => setPersons(persons.filter((p) => p !== contactToDelete)))
        .then(() => {
          notifications(
            `${contactToDelete.name}'s contact has been successfully deleted.`,
            'success',
          );
        })
        .catch((error) => {
          console.log(error.message);
          setPersons(persons.filter((p) => p !== contactToDelete));
          notifications(
            `The contact ${contactToDelete.name} does not exist in the database`,
            'error',
          );
        });
    }
  };

  const editContactHandler = (id) => {
    // Find the contact to edit
    const contactToEdit = persons.find((person) => person.id === id);

    if (contactToEdit) {
      // Populate newContactObj with the details of the contact to edit
      setNewContactObj({
        id: contactToEdit.id,
        name: contactToEdit.name,
        number: contactToEdit.number,
      });
    } else {
      // Handle the case where the contact with the given id was not found
      notifications('Contact not found', 'error');
    }
  };

  return (
    <div className="phonebook-app">
      <div className="title">
        <h1>Phonebook</h1>
        <div>
          {/* Render the HTML content using dangerouslySetInnerHTML */}
          <div dangerouslySetInnerHTML={{ __html: contactCount }} />
        </div>
        <Notification
          message={notification.message}
          status={notification.status}
        />
      </div>
      <div className="dashboard">
        <div className="dashboard-left">
          <SearchFilter filterHandler={filterHandler} />
          <h2>Add new contact</h2>
          <NewContactForm
            submitHandler={submitHandler}
            newContactNameHandler={newContactNameHandler}
            newContactObj={newContactObj}
            newContactNumberHandler={newContactNumberHandler}
          />
        </div>
        <div className="dashboard-right">
          <DisplayContacts
            deleteContactHandler={deleteContactHandler}
            editContactHandler={editContactHandler}
            currentContacts={currentContacts}
          />
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        contactsPerPage={contactsPerPage}
        filteredPersonList={filteredPersonList}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
