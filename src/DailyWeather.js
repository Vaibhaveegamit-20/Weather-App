import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import moment from 'moment'
import { Link } from 'react-router-dom'
import { fetchWeather } from './actions/index'
import { fetchForecast } from './actions/index'


class DailyWeather extends Component  {

    constructor(props) {
        super(props);
        this.state = {isCelsius: true};
        this.onClickCelsius = this.onClickCelsius.bind(this);
        this.onClickFarenhite = this.onClickFarenhite.bind(this);
      }

      componentDidMount(){
        if(this.props.weather.length !== 0){
            if(this.state.isCelsius === true){
                this.onClickCelsius();
            } else {
              this.onClickFarenhite();
            }
        }
         
      }


    onClickCelsius(e){

        this.setState({
            isCelsius: true
        })

        const city = this.props.weather[0].name;
        this.props.fetchWeather(city, "metric");
        this.props.fetchForecast(city, "metric");

    }

    onClickFarenhite(e){

        this.setState({
            isCelsius: false
        })

        const city = this.props.weather[0].name;
        this.props.fetchWeather(city, "imperial");
        this.props.fetchForecast(city, "imperial");

    }

    renderWeather(weatherData, forecastData){

        if(weatherData === undefined){
            return(
                <div>
                    <h1>Enter a valid City Name</h1>
                </div>
            )
        }
        else {

            var city = <div className="city">{weatherData.name}</div>

            var icon = <div className="icon"><img alt="icon" src={"http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png"}  height = "90px" width = "90px"/></div>;

            var description = <div className="description"> {weatherData.weather[0].description}</div>

            var temp = this.state.isCelsius ? <div className="temp">{Math.round(weatherData.main.temp)}&deg;C<br/></div> :
                                                     <div className="temp">{Math.round(weatherData.main.temp)}&deg;F<br/></div>;

            var feelsLike = this.state.isCelsius ? <div className="feels">Feels like {Math.round(weatherData.main.feels_like)}&deg;C</div> :
                                                      <div className="feels">Feels like {Math.round(weatherData.main.feels_like)}&deg;F</div>

            return(
                    <div className="row" key={weatherData.id}>
                            <div className="col-md-4 col-md-offset-4">
                                <div className="weather">
                                    <div className="current">
                                        <div className="info">
                                            <div className="selection">
                                                <button type="button" onClick={this.onClickCelsius}>&deg;<small>C</small></button> | <button type="button" onClick={this.onClickFarenhite}>&deg;<small>F</small></button>
                                            </div>
                                            
                                            {city}
                                            {icon}
                                            {description}
                                            {temp}
                                            {feelsLike}
                                            <div className="dayhl"> &#8593;{Math.round(weatherData.main.temp_max)}  &#8595;{Math.round(weatherData.main.temp_min)}</div>
                                            
                                            <div></div>
                                            <div key={weatherData.name}>
                                                {forecastData.map(data => this.renderForecast(data, this.state.isCelsius))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>

            )
        }
    };

    
    renderForecast(forecastData, isCelsius){
        
        if(forecastData === undefined){
            return(
                <div>
                    <h1>Enter a valid City Name</h1>
                </div>
            )
        }
        else {

            const forecastArray = [];
            const data = forecastData.list;
            console.log(data);
            var j=0;
            var tempMin = 100;
            var tempMax = -100;

            for(var i=0; i < data.length; i++){

                if(data[i].main.temp_min < tempMin)
                    tempMin = data[i].main.temp_min;
                if(data[i].main.temp_max > tempMax)
                    tempMax = data[i].main.temp_max;

                if(i===6 || i===14 || i===22 || i===30 || i===38)
                {
                    forecastArray[j]= {dt_txt: data[i].dt_txt, temp_min: tempMin, temp_max: tempMax, icon: data[i].weather[0].icon};
                    j++;
                    tempMin = 100;
                    tempMax = -100;
                }          
            }


            return(
                <div>
                    {
                        forecastArray.map(day => {
                            return ( 
                                <div key={day.dt_txt}>
                                <Link to={{ pathname: '/'+moment(day.dt_txt).format('dddd'), state:{date: day.dt_txt, isCelsius}}}>
                                    <div className="forecast">
                                        <div className="day">{moment(day.dt_txt).format('dddd')}</div>
                                        <div className="icon"> <img alt="icon" src={"http://openweathermap.org/img/wn/"+day.icon+"@2x.png"}  height = "65px" width = "65x"/></div>
                                        <div className="highlow"><span className="arrows">&#8593;</span>{Math.round(day.temp_max)}  <span className="arrows">&#8595;</span>{Math.round(day.temp_min)}</div>
                                    </div>
                                </Link>
                                </div>
                            )
                        })
                    }
                </div>
            )

        }

    }
    
    render(){
        return(
            <div>
                {
                    this.props.weather.map(data => this.renderWeather(data, this.props.forecast))
                }
            </div>
        )
    }
    
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchWeather, fetchForecast}, dispatch)
  }
  

const mapStatetoProps = (state) => {
    return{
        weather: state.weatherReducer,
        forecast: state.forecastReducer
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(DailyWeather)