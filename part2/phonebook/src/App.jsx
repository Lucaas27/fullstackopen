import { useState } from 'react'

const peopleList = [
  {
    id: '1',
    name: 'John Doe',
    number: '07758899268'
  }
]

function App() {
  const [persons, setPersons] = useState(peopleList)
  const [newContactObj, setNewContactObj] = useState({
    id: '',
    name:'',
    number:''
  })

  const newContactNameHandler = (e) => setNewContactObj({...newContactObj, name: e.target.value})
  const newContactNumberHandler = (e) => setNewContactObj({...newContactObj, number: e.target.value})

  const submitHandler = (e) => {
    e.preventDefault()

    const newContactData = {
      id: Math.random().toString(),
      name:newContactObj.name,
      number:newContactObj.number
    }

    const itExists = persons.find(value => JSON.stringify(value) === JSON.stringify(newContactData))

    
    !itExists && newContactObj.name !== '' && newContactObj.number !== ''? setPersons(persons.concat(newContactData)):alert( `The contact ${newContactObj.name} already exists in the phonebook or input is invalid`) 
    
    // console.log(itExists, newContactData, persons)

    setNewContactObj({
      id: '',
      name:'',
      number:''
    })

  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitHandler}>
        <div>
          Name: <input onChange={newContactNameHandler} value={newContactObj.name}/>
        </div>
        <div>
          Number: <input onChange={newContactNumberHandler} value={newContactObj.number}/>
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(
        (person) => {
          return (
            <div key={person.id}>
              <p>{person.name} - {person.number}</p>
            </div>
          )}
      )}
    </div>
  )
}

export default App
