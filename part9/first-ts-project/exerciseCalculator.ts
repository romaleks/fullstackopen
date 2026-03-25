interface exerciseReturn {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface exerciseValues {
  target: number
  dailyHours: number[]
}

const parseArguments = (args: string[]): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments')

  if (args.slice(2).some((arg) => isNaN(Number(arg)))) {
    throw new Error('Provided values were not numbers!')
  } else {
    const target = Number(args[2])
    const dailyHours = args.slice(3).map((arg) => Number(arg))
    return {
      target,
      dailyHours,
    }
  }
}

const calculateExercises = (
  target: number,
  dailyHours: number[],
): exerciseReturn => {
  const periodLength = dailyHours.length
  let trainingDays = 0
  let sum = 0

  for (const hours of dailyHours) {
    if (hours !== 0) trainingDays++
    sum += hours
  }

  const average = sum / periodLength
  const completePercents = (average / target) * 100
  const success = average >= target

  let rating, ratingDescription
  if (completePercents < 70) {
    rating = 1
    ratingDescription = 'very bad try better'
  } else if (completePercents < 100) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 3
    ratingDescription = "good job! you've reached your target"
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

try {
  const { target, dailyHours } = parseArguments(process.argv)
  console.log(calculateExercises(target, dailyHours))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}

export default calculateExercises
