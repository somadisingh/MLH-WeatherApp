import axios from "axios";
import { useEffect, useState } from "react";
import './App.css';
import logo from './mlh-prep.png';
import ForecastCard from "./Components/Forecast/ForecastCard";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City");
  const [results, setResults] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=7817e68c00a90c5a142287a9f7d664c3")
      .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] !== 200) {
            setIsLoaded(false)
          } else {
            setIsLoaded(true);
            setResults(result);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [city])

  useEffect(()=> {
    axios
      .get("http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&cnt=7&appid=7817e68c00a90c5a142287a9f7d664c3")
      .then(resp=> {
        setForecast(resp.data)
      })
  },[city])

  console.log("forecast", forecast)


  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return <>
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div>
        <h2>Enter a city below 👇</h2>
        <input
          type="text"
          value={city}
          onChange={event => setCity(event.target.value)} />
        <div className="Results">
          {!isLoaded && <h2>Loading...</h2>}
          {console.log(results)}
          {isLoaded && results && <>
            <h3>{results.weather[0].main}</h3>
            <p>Feels like {results.main.feels_like}°C</p>
            <i><p>{results.name}, {results.sys.country}</p></i>
            {/* <ul>
              {
                forecast.list.map(e =>(
                  <li>
                    <h2>Date: Monday</h2>
                    <h3>The weather is: {e.weather[0].description}</h3>
                    <p>Day: {e.feels_like.day}</p>
                    <p>Evening: {e.feels_like.eve}</p>
                    <p>Morning: {e.feels_like.morn}</p>
                    <p>Night: {e.feels_like.night}</p>
                  </li>
                ))
              }
            </ul> */}
          </>}
        </div>
        <div>
          {!isLoaded && <h2>Loading...</h2>}
          {console.log(results)}
          {isLoaded && results && <>
            <ForecastCard data={forecast}/>
          </>}
        </div>
      </div>
    </>
  }
}

export default App;
