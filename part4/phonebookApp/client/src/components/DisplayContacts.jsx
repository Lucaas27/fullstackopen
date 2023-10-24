import React from 'react';

const DisplayContacts = ({
  filteredPersonList, deleteContactHandler,
}) => filteredPersonList.map((person) => (
  <div className="contact" key={person.id}>
    <h2 className="contact-name">{person.name}</h2>
    <p>{person.number}</p>
    <button type="button" onClick={() => deleteContactHandler(person.id)}>
      Delete
    </button>
  </div>
));

export default DisplayContacts;
