const WeatherDisplay = ({weather}) => {
    if (weather) return (
        <div>
            <p>temperature {(weather.main.temp - 273.15).toFixed()}c</p>
            <p>wind {weather.wind.speed}m/s</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                 alt={weather.weather[0].description}/>
        </div>
    )
}


export default WeatherDisplay
