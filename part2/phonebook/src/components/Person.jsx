const Person = ({person, number, personId, onClick}) => {
    return (
        <li>
            {person} {number}
            <button id={personId} onClick={() => onClick(personId, person)}>delete</button>
        </li>
    )
}

export default Person
