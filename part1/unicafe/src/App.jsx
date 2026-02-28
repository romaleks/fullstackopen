import { useState } from 'react'

const Button = ({ name, handleClick }) => (
  <button onClick={handleClick}>{name}</button>
)

const Statistics = ({ good, neutral, bad }) => (
  <>
    <h1>Statistics</h1>
    {good || neutral || bad ? (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + neutral + bad} />
          <StatisticLine
            text="average"
            value={(good - bad) / (good + neutral + bad)}
          />
          <StatisticLine
            text="positive"
            value={(good / (good + neutral + bad)) * 100 + '%'}
          />
        </tbody>
      </table>
    ) : (
      <p>No feedback given</p>
    )}
  </>
)

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (name) => {
    if (name == 'good') setGood(good + 1)
    if (name == 'neutral') setNeutral(neutral + 1)
    if (name == 'bad') setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button name={'good'} handleClick={() => handleClick('good')} />
      <Button name={'neutral'} handleClick={() => handleClick('neutral')} />
      <Button name={'bad'} handleClick={() => handleClick('bad')} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
