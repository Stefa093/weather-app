import axios from 'axios';
import moment from 'moment/moment';
import React, { useState } from 'react'

const api = {
    key: `912ef7d561e85f7426f6d686fb3a7f72`,
    base: `https://api.openweathermap.org/data/2.5/`
}

const WeatherCard = ({weather, temperature}) => {

    const [isCelsius, setIsCelsius] = useState(true)
    const changeTemp = () => setIsCelsius(!isCelsius)
    const [query, setQuery] = useState('')
    const [climate, setClimate] = useState({})

    const search = e => {
        if (e.key === "Enter") {
            axios.get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => {
                setClimate(res.data)
                setQuery('')
                console.log(res.data);
            })
        }
    }
    return (
        <article>
            <div className='search-box'>
                <input 
                    type="text"
                    className='search-bar'
                    placeholder='Search...'
                    onChange={e => setQuery(e.target.value)}
                    value={query}
                    onKeyPress={search}
                />
            </div>
            {(typeof weather != "undefined") ? (
            <div className='card'>
            <h1 className='card__title'>Weather App</h1>
            <p>Day: {moment().format('dddd')}</p>
            <p>Date: {moment().format('LL')}</p>
            <h2 className='card__subtitle'>{`${weather.name}, ${weather.sys.country}`}</h2>
            <section className='card__first-section'>
                <img className='card__icon' src={weather ? `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png` : ''} alt="" />
            </section>
            <section className='card__second-section'>
                <h3 className='second__title'>"{weather.weather[0].main}"</h3>
                <h4 className='second__title'>"{weather.weather[0].description}"</h4>
                <ul className='second__list'>
                    <li className='second__item'>
                        <span className='second__span'><i class='bx bxl-tailwind-css'></i> Wind Speed: </span>{weather.wind.speed} m/s
                    </li>
                    <li className='second__item'>
                        <span className='second__span'><i class='bx bx-cloud'></i> Clouds: </span>{weather.clouds.all}%
                    </li>
                    <li className='second__item'>
                        <span className='second__span'><i class='bx bxs-thermometer'></i> Pressure: </span>{weather.main.pressure} hPa
                    </li>
                </ul>
            </section>
            <h2 className='card__temperature'>{isCelsius ? `${temperature?.celsius} °C` : `${temperature?.fahrenheit} °F`} </h2>
            <button className='card__button' onClick={changeTemp}>C° / F°</button>
            </div>
            ) : ('')}            
        </article>
    )
}

export default WeatherCard