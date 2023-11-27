import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchWeather } from './actions/index'
import { fetchForecast } from './actions/index'


class SearchBar extends Component {
 
    constructor(props) {
        super(props);
        this.state = { city: '' };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
      }

      onInputChange(event) {
        this.setState({ city: event.target.value })
      }

      
      onFormSubmit(event) {
        event.preventDefault();
        this.props.fetchWeather(this.state.city, "metric");
        this.props.fetchForecast(this.state.city, "metric");
      }

      render () {
        return (
            <div>
                <form className="col s12" onSubmit={this.onFormSubmit}>
                      <div className="row">
                          <div className="input-field col s4 offset-s4">
                              <input placeholder=" City" type="text" className="validate" value={this.state.city} onChange={this.onInputChange}/>
                          </div>
                      </div>
                  </form>
            </div>
        )
      }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchWeather, fetchForecast }, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar);