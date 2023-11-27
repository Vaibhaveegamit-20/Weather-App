import React, {Component} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

class HourlyWeather extends Component  {

    constructor(props) {
        super(props);
        this.state = { dayForecast: [], date: '' , celsius: ''};
        this.handleClick = this.handleClick.bind(this);
        this.displayTime = this.displayTime.bind(this);
    }

    componentDidMount(){
        this.setState({
            dayForecast: this.props.forecast,
            date: this.props.location.state.date,
            celsius: this.props.location.state.isCelsius
        })
    }

    handleClick(e) {
        this.props.history.push("/");       
    }

    displayTime(time){
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice (1);  // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time[0]+" "+time[5]; // return adjusted time or original string
    }


    render(){

        var dayForecast = [];

        this.state.dayForecast.map(res => {
           return dayForecast = res.list;
        });
        
        var inputDate = this.state.date.split(' ');
        var j=0;
        const hourlyWeather = [];

        for(var i=0; i < dayForecast.length; i++){
            let checkDate = dayForecast[i].dt_txt.split(' ');
                if(inputDate[0] === checkDate[0])
                hourlyWeather[j++] = dayForecast[i];
        }

        const hourlyCards = hourlyWeather.length ? (
            hourlyWeather.map(data => {

                var time = <h4>{this.displayTime(data.dt_txt.split(' ')[1])}</h4>;
                var description = <span className="card-title">{data.weather[0].main}</span>;
                var icon = <img alt="img" src={"http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"} />

                var temp = this.state.celsius ?
                <h4><strong>{Math.round(data.main.temp)}&deg;</strong><small>C</small></h4> :
                <h4><strong>{Math.round(data.main.temp)}&deg;</strong><small>F</small></h4>

                var feelsLike = this.state.celsius ?  
                                <h5>Feels like: {Math.round(data.main.feels_like)}&deg;<small>C</small></h5> : 
                                <h5>Feels like: {Math.round(data.main.feels_like)}&deg;<small>F</small></h5>;
                return(
                    <div className="col s12 m3" key={data.dt_txt}>
                        <div className="card medium">
                            <div className="card-content">
                                {time}
                                {description}
                                {icon}
                                {temp}
                                {feelsLike}
                            </div>
                        </div>
                    </div>
                )
            })
        ):(
             <div className="center">No data yet</div>
        );
        

        return(
            <div className="container">
                <button onClick={this.handleClick}>
                <FontAwesomeIcon icon={faChevronLeft} style={
                    {
                        fontSize: "50px",
                        color: "black"
                    }
                }/></button>
                    <h4>{moment(this.props.location.state.date).format("dddd, MMMM Do YYYY")}</h4>
                    <div className="row">
                        {hourlyCards}
                    </div>    
            </div>
        )
    }



}

const mapStatetoProps = (state) => {

    return{
        weather: state.weatherReducer,
        forecast: state.forecastReducer
    }

}

export default connect(mapStatetoProps)(HourlyWeather)