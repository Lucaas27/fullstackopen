import React from 'react';

function NewContactForm({
  submitHandler,
  newContactNameHandler,
  newContactObj,
  newContactNumberHandler,
}) {
  return (
    <form onSubmit={submitHandler} className="add-contact-form">
      <div>
        <input aria-label="Contact name" onChange={newContactNameHandler} value={newContactObj.name} placeholder="Name" />
      </div>
      <div>
        <input
          onChange={newContactNumberHandler}
          value={newContactObj.number}
          aria-label="Contact number"
          placeholder="Number"
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

export default NewContactForm;
