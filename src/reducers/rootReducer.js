import { combineReducers } from 'redux';
import WeatherReducer from './weather_reducer';
import ForecastReducer from './forecast_reducer';

const rootReducer = combineReducers({
  weatherReducer: WeatherReducer,
  forecastReducer: ForecastReducer
});

export default rootReducer;