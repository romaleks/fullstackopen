import express, { NextFunction, Request, Response } from 'express'
import z from 'zod'
import patientService from '../services/patientService'
import { newPatient, NonSensitivePatient, Patient } from '../types'
import newPatientSchema from '../utils'

const router = express.Router()

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body)
    next()
  } catch (error: unknown) {
    next(error)
  }
}

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues })
  } else {
    next(error)
  }
}

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitivePatients())
})

router.get('/:id', (req, res: Response<Patient>) => {
  res.json(patientService.getPatientById(req.params.id))
})

router.post(
  '/',
  newPatientParser,
  (
    req: Request<unknown, unknown, newPatient>,
    res: Response<NonSensitivePatient | string>,
  ) => {
    try {
      const addedPatient = patientService.addPatient(req.body)
      res.json(addedPatient)
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong.'
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message
      }
      res.status(400).send(errorMessage)
    }
  },
)

router.use(errorMiddleware)

export default router
