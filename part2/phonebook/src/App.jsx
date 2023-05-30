import { useState } from 'react'

const peopleList = [
  {
    id: '1',
    name: 'John Doe'
  }
]

function App() {
  const [persons, setPersons] = useState(peopleList)
  const [newContactName, setNewContactName] = useState('')

  const newContactNameHandler = (e) => setNewContactName(e.target.value)

  const submitHandler = (e) => {
    e.preventDefault()

    const newContactData = {
      id: Math.random().toString(),
      name:newContactName
    }

    const itExists = persons.find(value => JSON.stringify(value) === JSON.stringify(newContactData))

    
    !itExists && newContactName !== ''? setPersons(persons.concat(newContactData)):alert( `The name ${newContactName} already exists in the phonebook or is invalid`) 
    
    // console.log(itExists, newContactData, persons)

    setNewContactName('')


  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitHandler}>
        <div>
          Name: <input onChange={newContactNameHandler} value={newContactName}/>
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
