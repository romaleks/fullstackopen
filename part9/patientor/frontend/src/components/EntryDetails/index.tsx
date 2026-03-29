import { Diagnosis, Entry } from '../../types'
import HealthCheckEntry from './HealthCheckEntry'
import HospitalEntry from './HospitalEntry'
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry'

const assertNever = (value: never): never => {
  throw new Error(`Unhandled course part: ${JSON.stringify(value)}`)
}

const EntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry
  diagnoses: Diagnosis[]
}) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />
    default:
      return <div>{assertNever(entry)}</div>
  }
}
export default EntryDetails
