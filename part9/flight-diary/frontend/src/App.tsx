import { useEffect, useState } from 'react'
import diaryService from './diaryService'
import type { Diary } from './types'

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    diaryService.getAll().then((initialDiaries) => {
      setDiaries(initialDiaries)
    })
  }, [])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const newDiary = await diaryService.create({
        date,
        visibility,
        weather,
        comment,
      })
      setDiaries(diaries.concat(newDiary))
      setDate('')
      setVisibility('')
      setWeather('')
      setComment('')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'unknown error')
    }
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <p style={{ color: 'red' }}>{errorMessage}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          visibility:
          <label>
            <input
              type="radio"
              name="visibility"
              onChange={() => setVisibility('great')}
            />
            great
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              onChange={() => setVisibility('good')}
            />
            good
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              onChange={() => setVisibility('ok')}
            />
            ok
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              onChange={() => setVisibility('poor')}
            />
            poor
          </label>
        </div>
        <div>
          weather:
          <label>
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather('sunny')}
            />
            sunny
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather('rainy')}
            />
            rainy
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather('cloudy')}
            />
            cloudy
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather('stormy')}
            />
            stormy
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather('windy')}
            />
            windy
          </label>
        </div>
        <div>
          <label>
            comment:
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <div>visibility: {diary.visibility}</div>
          <div>weather: {diary.weather}</div>
          <div>comment: {diary.comment}</div>
        </div>
      ))}
    </div>
  )
}
export default App
