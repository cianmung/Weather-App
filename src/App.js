import React, { Component, useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import GetCityWeather from "./components/GetCityWeather";

class App extends Component {
  state = {
    weatherAppId: "db189daada3c8023225786a3a4fbd4f1"
  };
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <GetCityWeather appId={this.state.weatherAppId} />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
