import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import diagnosisService from '../services/diagnoses'
import patientService from '../services/patients'
import { Diagnosis, Patient } from '../types'
import EntryDetails from './EntryDetails'

const PatientPage = () => {
  const { id } = useParams()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) {
        setLoading(false)
        return
      }

      const fetchedPatient = await patientService.getById(id)
      setPatient(fetchedPatient)
      setLoading(false)
    }

    void fetchPatient()
  }, [id])

  useEffect(() => {
    diagnosisService.getAll().then((fetchedDiagnoses) => {
      setDiagnoses(fetchedDiagnoses)
    })
  }, [])

  if (loading) {
    return <div>Loading patient...</div>
  }

  if (!patient) {
    return <div>Patient not found</div>
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <div>gender: {patient.gender}</div>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      {patient.entries?.length ? (
        <div>
          <h3>entries</h3>
          {patient.entries?.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
export default PatientPage
