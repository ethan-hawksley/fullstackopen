import {useEffect, useState} from 'react'
import phoneService from './services/phonebook'
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons.jsx";
import Filter from "./components/Filter.jsx";
import Notification from "./components/Notification.jsx";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setNewFilter] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

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
                        setSuccessMessage(`Updated ${person.name}`)
                        setTimeout(() => {
                            setSuccessMessage(null)
                        }, 5000)
                    })
            }
        } else {
            phoneService
                .create(person)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setSuccessMessage(`Added ${person.name}`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
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
                    setSuccessMessage(`Deleted ${name}`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
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
            <Notification message={errorMessage} type='error'/>
            <Notification message={successMessage} type='success'/>
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
