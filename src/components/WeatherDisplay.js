import React, { Component } from "react";
import WeatherOfEachCity from "./WeatherOfEachCity";

class WeatherDisplay extends Component {
  state = {
    data: []
  };
  render() {
    this.state.data = this.props.weatherData;
    return (
      <React.Fragment>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {this.state.data.length !== 0 ? (
            <div style={{ marginTop: "30px" }}>
              <h1 style={{ display: "flex", justifyContent: "center" }}>
                Weather conditions
              </h1>
              <div style={{ display: "flex" }}>
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
