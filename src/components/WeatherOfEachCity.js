import React, { Component } from "react";
import { Image, Button } from "react-bootstrap";
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
          <div className="weather-display-img-container">
            <Button
              className="refresh"
              size="sm"
              onClick={() =>
                this.props.handleRefresh(
                  this.props.eachCityData.city,
                  this.props.eachCityData.id,
                  this.props.index
                )
              }
            >
              <i className="fa fa-refresh"></i>
            </Button>
            <Image
              className="weather-display-img"
              src={require("../images/" +
                this.props.handleImg(this.props.eachCityData.weatherId))}
              thumbnail
            />
          </div>
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
