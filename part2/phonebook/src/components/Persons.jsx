import Person from './Person'
import personService from '../services/persons'

const Persons = ({ persons, setPersons, newFilter }) => {
  const handlePersonDelete = (id, name) => {
    if (confirm(`Delete ${name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id))
      })
    }
  }

  return (
    <div>
      {persons
        .filter((person) => person.name.toLowerCase().includes(newFilter))
        .map((person) => (
          <Person
            key={person.name}
            person={person}
            handlePersonDelete={() =>
              handlePersonDelete(person.id, person.name)
            }
          />
        ))}
    </div>
  )
}

export default Persons
