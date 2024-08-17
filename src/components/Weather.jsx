import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/clouds.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
import mist_icon from '../assets/mist.png'

const Weather = () => {
    
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);
    const iconImage = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;
    

    const search = async (city)=>{
        if(city === ""){
            alert("Please Enter City Name");
            return;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }

            console.log(data);
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: data.weather[0].icon
            });
        } catch(error){
            setWeatherData(false);
            console.error("Error in fetching weather data");
        }
    }

    // useEffect(()=>{
    //     search("");
    // },[])

  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search' />
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} />
        </div>
        {weatherData?<>
            <img src={iconImage} alt=""  className='weather-icon'/>
            <p className='temperature'>{weatherData.temperature}°C</p>
            <p className='location'>{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{weatherData.humidity} %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{weatherData.windSpeed} Km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </>:<></>}
        
    </div>
  )
}

export default Weather
