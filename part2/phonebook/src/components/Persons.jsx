import Person from "./Person.jsx";

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

export default Persons
