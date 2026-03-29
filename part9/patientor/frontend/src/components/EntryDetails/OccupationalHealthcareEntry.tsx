import { Diagnosis, Entry } from '../../types'

type OccupationalHealthcareEntryProps = {
  entry: Extract<Entry, { type: 'OccupationalHealthcare' }>
  diagnoses: Diagnosis[]
}

const OccupationalHealthcareEntry = ({
  entry,
  diagnoses,
}: OccupationalHealthcareEntryProps) => {
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
      <div>employer: {entry.employerName}</div>
      {entry.sickLeave && (
        <div>
          sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </div>
      )}
    </div>
  )
}

export default OccupationalHealthcareEntry
