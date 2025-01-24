import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/'

const getAll = () => {
    const request = axios.get(`${baseUrl}/api/all`)
    return request.then(response => response.data)
}
const getWeather = (latlng) => {
    const [lat, lng] = latlng;
    console.log(lat, lng)
    const request = axios.get(`${weatherUrl}/weather?lat=${lat}&lon=${lng}&appid=${import.meta.env.VITE_WEATHER_API}`)
    return request.then(response => response.data)

}

export default {
    getAll, getWeather
}
