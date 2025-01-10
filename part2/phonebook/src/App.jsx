import {useEffect, useState} from 'react'
import phoneService from './services/phonebook'


const Person = ({person, number, personId, onClick}) => {
    return (
        <li>
            {person} {number}
            <button id={personId} onClick={() => onClick(personId, person)}>delete</button>
        </li>
    )
}

const Filter = ({filter, onChange}) => {
    return (
        <div>
            filter shown with <input value={filter} onChange={onChange}/>
        </div>
    )
}

const PersonForm = ({onSubmit, newName, onNameChange, newNumber, onNumberChange}) => {
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    name: <input value={newName} onChange={onNameChange}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={onNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

const Persons = ({persons, filter, onDelete}) => {
    return (
        <ul>
            {persons
                .filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
                .map((person) => <Person key={person.id} person={person.name} number={person.number}
                                         personId={person.id}
                                         onClick={onDelete}/>)}
        </ul>
    )
}

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setNewFilter] = useState('')
    useEffect(() => {
        phoneService.getAll()
            .then(response => {
                setPersons(response)
            })
    }, [])
    console.log('render', persons.length, 'notes')


    const addPerson = (event) => {
        event.preventDefault()
        if (newName === '') return
        const person = {
            name: newName,
            number: newNumber,
            id: persons.length === 0 ? '1' : (Number(persons[persons.length - 1].id) + 1).toString()
        }
        if (persons.reduce((found, x) => found || x.name === newName, false)) {
            if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                phoneService
                    .update(persons.find((i) => i.name === newName).id, person)
                    .then(returnedPerson => {
                        console.log(returnedPerson)
                        setPersons(persons.map((i) => {
                            return i.name === returnedPerson.name ?
                                returnedPerson :
                                i
                        }))
                    })
            }
        } else {
            phoneService
                .create(person)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const deletePerson = (personId, name) => {
        console.log(personId)
        if (confirm(`Delete ${name}?`)) {
            phoneService
                .deleteItem(personId)
                .then((returnedPerson => {
                    console.log(returnedPerson)
                    console.log(persons)
                    setPersons(persons.filter((i) => i.id !== returnedPerson.id))
                }))
        }
    }

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setNewFilter(event.target.value)
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} onChange={handleFilterChange}/>
            <h3>add a new</h3>
            <PersonForm
                onSubmit={addPerson}
                newName={newName}
                onNameChange={handleNameChange}
                newNumber={newNumber}
                onNumberChange={handleNumberChange}
            />

            <h3>Numbers</h3>
            <Persons persons={persons} filter={filter} onDelete={deletePerson}/>
        </div>
    )
}

export default App
