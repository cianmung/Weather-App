import React, { Component } from "react";
import WeatherOfEachCity from "./WeatherOfEachCity";
import "./css/WeatherDisplay.css";

class WeatherDisplay extends Component {
  state = {
    data: []
  };
  render() {
    const {
      weatherData,
      handleClose,
      handleImg,
      handleRefresh,
      showWeatherIcon
    } = this.props;
    let { data } = this.state;
    data = weatherData;
    this.state.data = data;
    return (
      <React.Fragment>
        <div className="weather-display-container">
          {this.state.data.length !== 0 ? (
            <div className="weather-display-container-inner">
              <h1 className="weather-display-container-inner-text">
                Weather conditions
              </h1>
              <div className="weather-of-each-city-container">
                {//this.state.data.map((each, index) => (
                weatherData.map((each, index) => (
                  <WeatherOfEachCity
                    key={each.id}
                    eachCityData={each}
                    handleClose={handleClose}
                    handleImg={handleImg}
                    handleRefresh={handleRefresh}
                    index={index}
                    showWeatherIcon={showWeatherIcon}
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
