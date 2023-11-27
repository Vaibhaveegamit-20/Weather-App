import axios from 'axios';

const API_KEY = '1338d267e0c875b358dd8a6b06131a73';

export const FETCH_WEATHER = 'FETCH_WEATHER';
export const FETCH_FORECAST = 'FETCH_FORECAST';

export const fetchWeather = (city, unit) => {

  const FETCH_WEATHER_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;
  const url = `${FETCH_WEATHER_URL}&units=${unit}&q=${city}`;
  const request = axios.get(url);

  return {
    type: FETCH_WEATHER,
    payload: request
  };
}

export const fetchForecast = (city, unit) => {

  const FORECAST_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;
  const url = `${FORECAST_URL}&units=${unit}&q=${city}`;
  const request = axios.get(url);

  return {
    type: FETCH_FORECAST,
    payload: request
  };
}


