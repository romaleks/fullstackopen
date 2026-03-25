import express from 'express'
import calculateBmi from './bmiCalculator'
import calculateExercises from './exerciseCalculator'
const app = express()

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight)
  const height = Number(req.query.height)

  if (isNaN(weight) || isNaN(height)) {
    return res.status(400).json({ error: 'malformatted parameters' })
  }

  const bmi = calculateBmi(height, weight)
  return res.json({ weight, height, bmi })
})

app.get('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body
  const dailyHours = daily_exercises as number[]

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' })
  }

  if (isNaN(Number(target)) || dailyHours.some((hours) => isNaN(hours))) {
    return res.status(400).json({ error: 'malformatted parameters' })
  }

  const result = calculateExercises(Number(target), dailyHours)
  return res.json(result)
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
