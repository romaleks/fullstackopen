import z from 'zod'
import { Gender } from './types'

const entryTypeSchema = z.enum([
  'HealthCheck',
  'Hospital',
  'OccupationalHealthcare',
])

const entrySchema = z
  .object({
    type: entryTypeSchema,
  })
  .loose()

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(entrySchema).default([]),
})

export default newPatientSchema
