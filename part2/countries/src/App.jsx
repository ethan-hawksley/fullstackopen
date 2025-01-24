import {useEffect, useState} from "react";
import countryService from './services/countries'
import CountryList from "./components/countryList.jsx";

function App() {
    const [countries, setCountries] = useState([])
    const [shownCountries, setShownCountries] = useState([])
    const [search, setSearch] = useState('')
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        countryService
            .getAll()
            .then(allCountries => {
                console.log(allCountries)
                setCountries(allCountries)
                setShownCountries(allCountries.filter((i) => i.name.common.toLowerCase().includes(search)))
            })
    }, [])

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
        setShownCountries(countries.filter((i) => i.name.common.toLowerCase().includes(event.target.value)))
    }

    const forceShow = (countryName) => {
        setShownCountries([countries.find((i) => i.name.common === countryName)])
    }

    const updateWeather = (latlng) => {
        if (weather === null || weather.coord.lat !== latlng[0] || weather.coord.lon !== latlng[1]) {
            countryService
                .getWeather(latlng)
                .then((weather) => {
                    setWeather(weather)
                })
        }

    }

    return (
        <div>
            <div>find countries <input value={search} onChange={handleSearchChange}/></div>
            <CountryList countries={shownCountries} forceShow={forceShow} updateWeather={updateWeather} weather={weather}/>
        </div>
    )
}

export default App
