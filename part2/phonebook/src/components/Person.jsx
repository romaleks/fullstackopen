const Person = ({ person, handlePersonDelete }) => {
  return (
    <div>
      {person.name} {person.phone}
      <button onClick={handlePersonDelete}>delete</button>
    </div>
  )
}

export default Person
