import type { CoursePart } from '../types'

interface PartProps {
  part: CoursePart
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled course part: ${JSON.stringify(value)}`)
}

const Part = ({ part }: PartProps) => {
  const heading = (
    <h3>
      {part.name} {part.exerciseCount}
    </h3>
  )

  switch (part.kind) {
    case 'basic':
      return (
        <div>
          {heading}
          <i>{part.description}</i>
        </div>
      )
    case 'group':
      return (
        <div>
          {heading}
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      )
    case 'background':
      return (
        <div>
          {heading}
          <p>{part.description}</p>
          <p>submit to {part.backgroundMaterial}</p>
        </div>
      )
    default:
      return assertNever(part)
  }
}
export default Part
