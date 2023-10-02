import React from "react";

const DisplayContacts = ({ filteredPersonList, deleteContactHandler }) => {
  return filteredPersonList.map((person) => {
    return (
      <div key={person.id}>
        <p>
          {person.name} - {person.number}
          <button onClick={() => deleteContactHandler(person.id)}>
            Delete
          </button>
        </p>
      </div>
    );
  });
};

export default DisplayContacts;
