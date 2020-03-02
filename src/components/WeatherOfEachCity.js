import React, { useState, useEffect } from "react";
import { Image, Button } from "react-bootstrap";
import "./css/WeatherOfEachCity.css";

function WeatherOfEachCity(props) {
  const { city, id, weatherId, temp, condition } = props.eachCityData;
  const { handleClose, handleRefresh, handleImg, index } = props;
  const [seconds, setSeconds] = useState(0);
  const refreshTime = 600;

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function showUpdateTime(e) {
    if (e > 60) {
      var min = parseInt(e / 60);
      var sec = e % 60;
      var time =
        min +
        (min > 1 ? " minutes " : " miute ") +
        sec +
        (sec > 1 ? " seconds " : " second ");
      return time;
    } else {
      return e + (e > 1 ? " seconds " : " second ");
    }
  }
  return (
    <React.Fragment>
      <div className="weather-display-box">
        <h5>
          {city}
          <p className="closeButton" onClick={() => handleClose(id)}>
            &times;
          </p>
        </h5>
        <div className="weather-display-img-container">
          <Button
            className="refresh"
            size="sm"
            onClick={() => {
              handleRefresh(city, id, index);
              setSeconds(0);
            }}
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
        <p className="refresh-time-container">
          The weather will be refreshed in <br></br>
          {showUpdateTime(refreshTime - seconds)}
          {seconds > refreshTime && handleRefresh(city, id, index)}
          {seconds > refreshTime && setSeconds(0)}
        </p>
        <Button
          size="sm"
          onClick={() => {
            window.open("./WeatherDisplay/" + city);
          }}
        >
          Details
        </Button>
      </div>
    </React.Fragment>
  );
}

export default WeatherOfEachCity;
