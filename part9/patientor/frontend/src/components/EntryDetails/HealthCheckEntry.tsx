import { Diagnosis, Entry } from '../../types'

type HealthCheckEntryProps = {
  entry: Extract<Entry, { type: 'HealthCheck' }>
  diagnoses: Diagnosis[]
}

const HealthCheckEntry = ({ entry, diagnoses }: HealthCheckEntryProps) => {
  return (
    <div>
      <div>{entry.date}</div>
      <div>{entry.description}</div>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code}{' '}
            {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
          </li>
        ))}
      </ul>
      <div>health check rating: {entry.healthCheckRating}</div>
    </div>
  )
}

export default HealthCheckEntry
