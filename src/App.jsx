import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import Loading from './components/Loading'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()

  
  useEffect(() => {
    const success = (pos) => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(obj)
    }
    const error = (err) => {
      console.warn(`ERROR(${err.code}) : ${err.message}`);
      alert(
        "!Localización requerida"
      )
    }
    navigator.geolocation.getCurrentPosition(success, error)
  }, [])
  
  useEffect(() => {
    if(coords){
      const apiKey = `912ef7d561e85f7426f6d686fb3a7f72`
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`
      axios.get(URL)
      .then(res => {
        const celsius = (res.data.main.temp - 273.15).toFixed(0)
        const fahrenheit = (celsius * 9 / 5 + 32).toFixed(0)
        setTemperature({celsius, fahrenheit}) 
        setWeather(res.data)
      })
      .catch(err => console.log(err))
    }
  }, [coords])
  

  return (
    <div className={(typeof weather != "undefined") 
      ? ((weather?.weather[0].main === "Rain") 
        ? 'App_rain'
        : ((weather?.weather[0].main === "Clouds") 
          ? 'App_cloud' 
          : 'App'))
      : 'App'}>
        {
        weather ?
        <WeatherCard 
        weather={weather} 
        temperature={temperature}/>
        :
        <Loading />
        }
    </div>
  )
}

export default App
