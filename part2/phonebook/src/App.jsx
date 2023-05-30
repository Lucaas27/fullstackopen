import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    {
      id: '1',
      name: 'John Doe'
    }
  ])
  const [newContact, setNewContact] = useState('')

  const newContactNameHandler = (e) => {
    const newContactNameData = {
      id: Math.random().toString,
      name:e.target.value
    }
    setNewContact(newContactNameData)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    setPersons(persons.concat(newContact))
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitHandler}>
        <div>
          Name: <input onChange={newContactNameHandler}/>
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(
        (x) => <p key={x.id}>{x.name}</p>
      )}
    </div>
  )
}

export default App
