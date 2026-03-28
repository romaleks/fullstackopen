import { v1 as uuid } from 'uuid'
import patients from '../../data/patients'
import { newPatient, NonSensitivePatient, Patient } from '../types'

const getDiagnoses = (): Patient[] => {
  return patients
}

const getNonSensitiveDiagnoses = (): NonSensitivePatient[] => {
  return patients.map(({ id, dateOfBirth, gender, name, occupation }) => ({
    id,
    dateOfBirth,
    gender,
    name,
    occupation,
  }))
}

const addPatient = (data: newPatient): NonSensitivePatient => {
  const newPatient = {
    id: uuid(),
    ...data,
  }

  patients.push(newPatient)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ssn, ...nonSensitivePatient } = newPatient
  return nonSensitivePatient
}

export default {
  getDiagnoses,
  getNonSensitiveDiagnoses,
  addPatient,
}
