const Header = ({ name }) => <h1>{name}</h1>

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const calculateTotal = (parts) =>
  parts.reduce((sum, part) => sum + part.exercises, 0)

const Total = ({ total }) => <b>Number of exercises {total}</b>

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={calculateTotal(course.parts)} />
    </div>
  )
}

export default Course
