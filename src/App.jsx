import { useState, useEffect } from "react";
import './styles.css';
import axios from "axios";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const apiKey = import.meta.env.REACT_APP_API_KEY;


  const fetchWeather = async (city) => {
    if (!city) {
      setErrorMessage("Please enter a city name.");
      return;
    }

    try {
      setErrorMessage("");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
      setErrorMessage("City Not found");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);


    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(() => {
      if (value) fetchWeather(value);
    }, 2000);

    setDebounceTimeout(timeout);
  };


  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleInputChange}
        className="input-field"
      />
      {/* <button onClick={fetchWeather} className="fetch-button">
        Get Weather
      </button> */}

      {/* Display Error Message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default App;
