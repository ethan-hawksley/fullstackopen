import {useEffect, useState} from 'react'
import axios from "axios";


const Person = ({person}) => {
    return (
        <li>{person}</li>
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

const Persons = ({persons, filter}) => {
    return (
        <ul>
            {persons
                .filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
                .map((person) => <Person key={person.id} person={`${person.name} ${person.number}`}/>)}
        </ul>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])
    console.log('render', persons.length, 'notes')

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setNewFilter] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        const person = {
            name: newName,
            number: newNumber,
            id: persons.length
        }
        if (persons.reduce((found, x) => found || x.name === newName, false)) {
            alert(`${person.name} is already added to phonebook`)
        } else {
            setPersons(persons.concat(person))
            setNewName('')
            setNewNumber('')
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
            <Persons persons={persons} filter={filter} />
        </div>
    )
}

export default App
