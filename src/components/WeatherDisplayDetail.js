import React, { useEffect, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import "./css/WeatherDisplayDetail.css";

const WeatherDisplayDetail = props => {
  const [currentWeatherData, setCurrentWeatherData] = useState({});
  //const weatherData = {};
  useEffect(() => {
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?q=" +
          props.match.params.city +
          "&APPID=db189daada3c8023225786a3a4fbd4f1"
      )
      .then(res => {
        const weatherData = {
          cityId: null,
          city: null,
          weatherId: null,
          mainDesc: null,
          description: null,
          iconId: null,
          temp: null,
          tempFeelsLike: null,
          maxTemp: null,
          minTemp: null,
          airPressure: null,
          humidity: null,
          windSpeed: null,
          windDirection: null,
          timeSunrise: null,
          timeSunset: null
        };
        weatherData.cityId = res.data.id;
        weatherData.city = res.data.name;
        weatherData.weatherId = res.data.weather[0].id;
        weatherData.mainDesc = res.data.weather[0].main;
        weatherData.description = res.data.weather[0].description;
        weatherData.iconId = res.data.weather[0].icon;
        weatherData.temp = parseInt(res.data.main.temp - 273); //Convert Kelvin to Celsius
        weatherData.tempFeelsLike = parseInt(res.data.main.feels_like - 273);
        weatherData.maxTemp = parseInt(res.data.main.temp_max - 273);
        weatherData.minTemp = parseInt(res.data.main.temp_min - 273);
        weatherData.airPressure = parseInt(res.data.main.pressure);
        weatherData.humidity = parseInt(res.data.main.humidity);
        weatherData.windSpeed = res.data.wind.speed;
        weatherData.windDirection = res.data.wind.deg;
        weatherData.timeSunrise = res.data.sys.sunrise;
        weatherData.timeSunset = res.data.sys.sunset;
        setCurrentWeatherData(weatherData);
      })
      .catch(err => {
        console.log(err);
        alert("Your city name is wrong. Please try again.");
      });
  }, []);
  function handleImg(weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
      return "Thunderstorm.gif";
    } else if (weatherId >= 300 && weatherId < 500) {
      return "Drizzle.png";
    } else if (weatherId >= 500 && weatherId < 600) {
      return "Rain.gif";
    } else if (weatherId >= 600 && weatherId < 700) {
      return "Snow.gif";
    } else if (weatherId >= 700 && weatherId < 800) {
      return "Atmosphere.jpg";
    } else if (weatherId === 800) {
      return "Clear.gif";
    } else if (weatherId > 800 && weatherId < 900) {
      return "Clouds.jpg";
    } else {
      console.log("Something is wrong!.");
    }
  }
  function convertUnixToTime(timeStamp) {
    var date = new Date(timeStamp * 1000);

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var secends = date.getSeconds();

    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    secends = secends < 10 ? "0" + secends : secends;
    var strTime = hours + ":" + minutes + ":" + secends + " " + ampm;

    return strTime;
  }
  return (
    <React.Fragment>
      <Row>
        <Col className="image-row-wrapper">
          {currentWeatherData.weatherId != undefined && (
            <Image
              className="image-row-img"
              src={require("../images/" +
                handleImg(currentWeatherData.weatherId))}
              thumbnail
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col className="weather-detail-title-container">
          <h3>Weather Details of {currentWeatherData.city}</h3>
        </Col>
      </Row>
      <Row>
        <Col className="weather-detail-container">
          <Col>
            <div className="weather-detail-container-first-column">
              <p>City : {currentWeatherData.city}</p>
              <p>Condition : {currentWeatherData.mainDesc}</p>
              <p>Temp : {currentWeatherData.temp}&#176;C</p>
              <p>
                Feels-like Temp : {currentWeatherData.tempFeelsLike}
                &#176;C
              </p>
              <p>Mini-temp : {currentWeatherData.minTemp}&#176;C</p>
              <p>Maxi-temp : {currentWeatherData.maxTemp}&#176;C</p>
            </div>
          </Col>
          <Col>
            <div className="weather-detail-container-second-column">
              <p>Air Pressure : {currentWeatherData.airPressure} mb</p>
              <p>Humidity : {currentWeatherData.humidity}%</p>
              <p>Wind Speed : {currentWeatherData.windSpeed} m/s</p>
              <p>Wind Direction : {currentWeatherData.windDirection}&#176;</p>
              <p>
                Sunrise : {convertUnixToTime(currentWeatherData.timeSunrise)}
              </p>
              <p>Sunset : {convertUnixToTime(currentWeatherData.timeSunset)}</p>
            </div>
          </Col>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default WeatherDisplayDetail;
