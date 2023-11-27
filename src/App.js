import React, { Component } from 'react';
import DailyWeather from './DailyWeather';
import SearchBar from './SearchBar';
import HourlyWeather from './HourlyWeather';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';

class App extends Component {
  render(){
    return(
      <BrowserRouter>
          <div className="App">
              <Route exact path="/" component={SearchBar}/>
              <Route exact path="/" component={DailyWeather}/>
              <Route exact path="/:day" component={HourlyWeather}/>
          </div>
      </BrowserRouter>
        
    )
  }
}

export default App;
