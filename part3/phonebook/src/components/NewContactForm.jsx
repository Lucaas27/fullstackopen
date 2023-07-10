import React from 'react';

function NewContactForm({
  submitHandler,
  newContactNameHandler,
  newContactObj,
  newContactNumberHandler,
}) {
  return (
    <form onSubmit={submitHandler}>
      <div>
        Name:
        {' '}
        <input aria-label="Contact name" onChange={newContactNameHandler} value={newContactObj.name} />
      </div>
      <div>
        Number:
        {' '}
        <input
          onChange={newContactNumberHandler}
          value={newContactObj.number}
          aria-label="Contact number"
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

export default NewContactForm;
