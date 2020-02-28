import React, { Component } from "react";
import WeatherOfEachCity from "./WeatherOfEachCity";
import "./css/WeatherDisplay.css";

class WeatherDisplay extends Component {
  state = {
    data: []
  };
  render() {
    this.state.data = this.props.weatherData;
    return (
      <React.Fragment>
        <div className="weather-display-container">
          {this.state.data.length !== 0 ? (
            <div className="weather-display-container-inner">
              <h1 className="weather-display-container-inner-text">
                Weather conditions
              </h1>
              <div className="weather-of-each-city-container">
                {this.state.data.map(map => (
                  <WeatherOfEachCity
                    key={map.id}
                    eachCityData={map}
                    handleClose={this.props.handleClose}
                    handleImg={this.props.handleImg}
                  />
                ))}
              </div>
            </div>
          ) : (
            <h1>Please enter a city name.</h1>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default WeatherDisplay;
