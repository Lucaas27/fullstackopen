import { useState } from 'react'

const peopleList = [
  { id: '1', name: 'Arto Hellas', number: '040-123456' },
  { id: '2', name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: '3', name: 'Dan Abramov', number: '12-43-234345' },
  { id: '4' , name: 'Mary Poppendieck', number: '39-23-6423122'},
  { id: '5', name: 'John Doe', number: '07758899268'},
]

function App() {
  const [persons, setPersons] = useState(peopleList)
  const [personsFilter, setPersonsFilter] = useState('')
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

  const filterHandler = (e) => {
    const filteredPerson = persons.filter(person => person.name.includes(e.target.value))
    setPersonsFilter(filteredPerson)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Search: <input type="text" onChange={filterHandler}/>
      </div>
      <h2>Add new contact</h2>
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
