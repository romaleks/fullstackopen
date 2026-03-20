import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons))
  }, [])

  const handleFilterChange = (e) => setNewFilter(e.target.value)

  const handleNameChange = (e) => setNewName(e.target.value)

  const handlePhoneChange = (e) => setNewPhone(e.target.value)

  const handlePersonSubmit = (e) => {
    e.preventDefault()
    if (persons.some((person) => person.name === newName)) {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const person = persons.find((person) => person.name === newName)
        const changedPerson = { ...person, phone: newPhone }

        personService
          .update(changedPerson.id, changedPerson)
          .then(() => {
            setPersons(
              persons.map((person) =>
                person.id === changedPerson.id ? changedPerson : person,
              ),
            )
            setNewName('')
            setNewPhone('')
            setNotificationMessage({
              message: `Updated ${changedPerson.name}`,
              isSuccessful: true,
            })
            setTimeout(() => {
              setNotificationMessage(null)
            }, 3000)
          })
          .catch((error) => {
            const status = error.response.status

            if (status === 400) {
              setNotificationMessage({
                message: error.response.data.error,
                isSuccessful: false,
              })
            } else if (status === 404) {
              setNotificationMessage({
                message: `Information of ${person.name} has already been removed from server`,
                isSuccessful: false,
              })
              setTimeout(() => {
                setNotificationMessage(null)
                setPersons(
                  persons.filter((person) => person.id !== changedPerson.id),
                )
              }, 3000)
            } else {
              setNotificationMessage({
                message: `An unexpected error occurred: ${status}`,
                isSuccessful: false,
              })
            }
          })
      }
    } else {
      const personObject = { name: newName, phone: newPhone }

      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhone('')
          setNotificationMessage({
            message: `Added ${returnedPerson.name}`,
            isSuccessful: true,
          })
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
        })
        .catch((error) => {
          setNotificationMessage({
            message: error.response.data.error,
            isSuccessful: false,
          })
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>add new</h3>
      <Notification message={notificationMessage} />
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        handlePersonSubmit={handlePersonSubmit}
      />

      <h2>Numbers</h2>

      <Persons
        persons={persons}
        setPersons={setPersons}
        newFilter={newFilter}
      />
    </div>
  )
}

export default App
