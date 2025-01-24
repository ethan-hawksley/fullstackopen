import WeatherDisplay from './weatherDisplay'

const CountryList = ({countries, forceShow, updateWeather, weather}) => {
    if (countries.length > 10) return (
        <div>Too many matches, specify another filter</div>
    )
    if (countries.length === 1) {
        const country = countries[0]
        // console.log(country)
        console.log(weather)
        updateWeather(country.latlng)
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>capital {country.capital[0]}</p>
                <p>area {country.area}km^2</p>
                <h2>languages</h2>
                <ul>{Object.values(country.languages).map((i) => <li key={i}>{i}</li>)}</ul>
                <img src={country.flags.png} alt={country.flags.alt}/>
                <WeatherDisplay weather={weather}/>
            </div>
        )
    }
    return (
        <ul>
            {countries.map((i) => <li key={i.name.common}>{i.name.common}
                <button onClick={() => forceShow(i.name.common)}>show</button>
            </li>)}
        </ul>
    )
}


export default CountryList
