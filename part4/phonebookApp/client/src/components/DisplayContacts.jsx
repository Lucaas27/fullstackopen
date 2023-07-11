import React from 'react';

const DisplayContacts = ({
  filteredPersonList, deleteContactHandler,
}) => filteredPersonList.map((person) => (
  <div key={person.id}>
    <p>
      {person.name}
      {' '}
      -
      {person.number}
      <button type="button" onClick={() => deleteContactHandler(person.id)}>
        Delete
      </button>
    </p>
  </div>
));

export default DisplayContacts;
