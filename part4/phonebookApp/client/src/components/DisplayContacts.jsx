import React from 'react';

export default function DisplayContacts({
  deleteContactHandler,
  editContactHandler,
  currentContacts,
}) {
  return currentContacts.map((person) => (
    <div className="contact" key={person.id}>
      <h2 className="contact-name">{person.name}</h2>
      <p>{person.number}</p>
      <div className="buttons">
        <button type="button" className="delete" onClick={() => deleteContactHandler(person.id)}>
          Delete
        </button>
        <button type="button" className="edit" onClick={() => editContactHandler(person.id)}>
          Edit
        </button>
      </div>
    </div>
  ));
}
