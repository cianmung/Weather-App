import React, { Component, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import WeatherDisplay from "./WeatherDisplay";
import "./css/GetCityWeather.css";

function GetCityWeather(props) {
  const [cityId, setCityId] = useState(1);
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  function handleClose(id) {
    console.log("close function called.");
    const weatherDataUpdated = weatherData.filter(e => e.id !== id);
    setWeatherData(weatherDataUpdated);
  }

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
    } else if (weatherId == 800) {
      return "Clear.gif";
    } else if (weatherId > 800 && weatherId < 900) {
      return "Clouds.jpg";
    } else {
      console.log("Something is wrong!.");
    }
  }
  function handleSearch(e) {
    if (weatherData.length >= 4) {
      alert(
        "You have reach maximun number of city. Please delete a city in order to add."
      );
    } else {
      if (weatherData.some(item => e === item.city)) {
        alert("You have searched added " + e + ".");
      } else {
        axios
          .get(
            "http://api.openweathermap.org/data/2.5/weather?q=" +
              e +
              "&APPID=" +
              props.appId
          )
          .then(res => {
            const eachData = {
              id: "",
              city: "",
              temp: null,
              condition: "",
              weatherId: null,
              weatherDescription: "",
              weatherIconId: ""
            };
            setCityId(cityId + 1);
            eachData.id = cityId;
            eachData.city = res.data.name;
            eachData.temp = parseInt(res.data.main.temp - 273); //Convert Kelvin to Celsius
            eachData.condition = res.data.weather[0].main;
            eachData.weatherId = res.data.weather[0].id;
            eachData.weatherDescription = res.data.weather[0].description;
            eachData.weatherIconId = res.data.weather[0].icon;
            setWeatherData(oldArray => [...oldArray, eachData]);
          })
          .catch(err => {
            console.log(err);
            alert("Your city name is wrong. Please try again.");
          });
      }
    }
  }
  function handleRefresh(e, id, index) {
    console.log("The weather is refreshed");
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?q=" +
          e +
          "&APPID=" +
          props.appId
      )
      .then(res => {
        const eachData = {
          id: "",
          city: "",
          temp: null,
          condition: "",
          weatherId: null,
          weatherDescription: "",
          weatherIconId: ""
        };
        eachData.id = id;
        eachData.city = res.data.name;
        eachData.temp = parseInt(res.data.main.temp - 273); //Convert Kelvin to Celsius
        eachData.condition = res.data.weather[0].main;
        //eachData.condition = "updated";
        eachData.weatherId = res.data.weather[0].id;
        eachData.weatherDescription = res.data.weather[0].description;
        eachData.weatherIconId = res.data.weather[0].icon;
        const data = [...weatherData];
        data[index] = eachData;
        setWeatherData(data);
      });
  }
  return (
    <div>
      <Form className="search-bar-container">
        <input style={{ display: "none" }} />
        <Form.Control
          name="cityName"
          style={{ marginRight: "5px" }}
          type="text"
          placeholder="Search a city"
          onChange={e => {
            setCityName(e.target.value);
          }}
        />
        <Button variant="primary" onClick={() => handleSearch(cityName)}>
          Search
        </Button>
      </Form>
      <WeatherDisplay
        weatherData={weatherData}
        handleClose={handleClose}
        handleImg={handleImg}
        handleRefresh={handleRefresh}
      />
    </div>
  );
}

export default GetCityWeather;
