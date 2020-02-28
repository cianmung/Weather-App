import React, { Component } from "react";
import { Image, Button } from "react-bootstrap";
import "./css/WeatherOfEachCity.css";

class WeatherOfEachCity extends Component {
  render() {
    const { city, id, weatherId, temp, condition } = this.props.eachCityData;
    const { handleClose, handleRefresh, handleImg, index } = this.props;
    return (
      <React.Fragment>
        <div className="weather-display-box">
          <h5>
            {city}
            <a className="closeButton" onClick={() => handleClose(id)}>
              &times;
            </a>
          </h5>
          <div className="weather-display-img-container">
            <Button
              className="refresh"
              size="sm"
              onClick={() => handleRefresh(city, id, index)}
            >
              <i className="fa fa-refresh"></i>
            </Button>
            <Image
              className="weather-display-img"
              src={require("../images/" + handleImg(weatherId))}
              thumbnail
            />
          </div>
          <div className="weather-display-bottom-text-container">
            <h5>{temp}&#176;C</h5>
            <h5 className="weather-condition">{condition}</h5>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default WeatherOfEachCity;
