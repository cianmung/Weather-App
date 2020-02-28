import React, { Component } from "react";
import { Image } from "react-bootstrap";
import "./css/WeatherOfEachCity.css";

class WeatherOfEachCity extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="weather-display-box">
          <h5>
            {this.props.eachCityData.city}
            <a
              className="closeButton"
              onClick={() => this.props.handleClose(this.props.eachCityData.id)}
            >
              &times;
            </a>
          </h5>
          <Image
            className="weather-display-img"
            src={require("../images/" +
              this.props.handleImg(this.props.eachCityData.weatherId))}
            thumbnail
          />
          <div className="weather-display-bottom-text-container">
            <h5>{this.props.eachCityData.temp}&#176;C</h5>
            <h5 className="weather-condition">
              {this.props.eachCityData.condition}
            </h5>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default WeatherOfEachCity;
