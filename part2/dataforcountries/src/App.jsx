import axios from 'axios'
import { useState, useEffect } from 'react'

const Country = ({ country }) => {
  const weatherIcon = `https://openweathermap.org/payload/api/media/file/${country.icon}.png`
  return (
    <div>
      <h1>{country.name}</h1>
      <div>{country.capital}</div>
      <div>{country.area}</div>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flag} alt={country.name} />
      <h2>Weather in {country.name}</h2>
      <div>Temperature is {country.temperature} Celsius</div>
      <img src={weatherIcon} />
      <div>Wind {country.wind} m/s</div>
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [foundCountries, setFoundCountries] = useState([])
  const [shownCountries, setShownCountries] = useState([])
  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((request) => setCountries(request.data))
  }, [])

  useEffect(() => {
    shownCountries.map((country) => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${country.lat}&lon=${country.lon}&appid=${api_key}`,
        )
        .then((request) => {
          setFoundCountries(
            foundCountries.map((fcountry) =>
              fcountry.name !== country.name
                ? fcountry
                : {
                    ...fcountry,
                    temperature: (request.data.main.temp - 273.15).toFixed(1),
                    wind: request.data.wind.speed,
                    icon: request.data.weather[0].icon,
                  },
            ),
          )
        })
    })
  }, [shownCountries])

  const handleCountryChange = (e) => {
    const searchCountry = e.target.value
    const searchCountries = countries
      .filter((country) =>
        country.name.common.toLowerCase().includes(searchCountry.toLowerCase()),
      )
      .map((country) => ({
        name: country.name.common,
        capital: country.capital && country.capital[0],
        area: country.area,
        languages: Object.values({ ...country.languages }),
        flag: country.flags.png,
        lat: country.latlng[0],
        lon: country.latlng[1],
        isShow: false,
      }))
    setFoundCountries(searchCountries)
    if (searchCountries.length === 1) setShownCountries([searchCountries[0]])
  }

  const handleShowCountry = (showCountry) => {
    const copyCountry = { ...showCountry, isShow: !showCountry.isShow }
    setFoundCountries(
      foundCountries.map((country) =>
        country.name === showCountry.name ? copyCountry : country,
      ),
    )
    if (showCountry.isShow) {
      const newShownCountries = shownCountries.filter(
        (country) => country.name !== showCountry.name,
      )
      setShownCountries(newShownCountries)
    } else {
      setShownCountries(shownCountries.concat(showCountry))
    }
  }

  return (
    <div>
      find countries <input onChange={handleCountryChange} />
      {foundCountries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : foundCountries.length <= 10 && foundCountries.length !== 1 ? (
        <ul>
          {foundCountries.map((country) => (
            <div key={country.name}>
              <li>
                {country.name}{' '}
                <button onClick={() => handleShowCountry(country)}>show</button>
              </li>
              {country.isShow ? <Country country={country} /> : null}
            </div>
          ))}
        </ul>
      ) : foundCountries.length === 1 ? (
        <Country country={foundCountries[0]} />
      ) : null}
    </div>
  )
}

export default App
