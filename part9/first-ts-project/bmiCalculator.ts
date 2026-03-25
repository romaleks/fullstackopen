interface bmiValues {
  height: number
  weight: number
}

const parseArguments = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const calculateBmi = (height: number, weight: number): string => {
  const validatedHeight = height / 100
  const BMI = weight / validatedHeight ** 2

  if (BMI < 18.5) return 'Underweight'
  else if (18.5 <= BMI && BMI < 25) return 'Normal weight'
  else if (25 <= BMI && BMI < 30) return 'Overweight'
  else if (30 <= BMI && BMI < 35) return 'Obese'
  else return 'Extremely obese'
}

try {
  const { height, weight } = parseArguments(process.argv)
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}

export default calculateBmi
