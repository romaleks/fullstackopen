import { Diagnosis, Entry } from '../../types'

type HospitalEntryProps = {
  entry: Extract<Entry, { type: 'Hospital' }>
  diagnoses: Diagnosis[]
}

const HospitalEntry = ({ entry, diagnoses }: HospitalEntryProps) => {
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
      <div>{entry.discharge.date}</div>
      <div>{entry.discharge.criteria}</div>
    </div>
  )
}
export default HospitalEntry
