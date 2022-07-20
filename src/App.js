import { useEffect, useState } from "react";
import "./App.css";
import logo from "./img/mlh-prep.png";
import ItemCard from "./ItemCard";
import Objects from "./Utilities/Objects";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City");
  const [results, setResults] = useState(null);
  const [objects, setObjects] = useState([]);

  function bringRightThings(results) {
    if (results.weather[0].main === "Clear") {
      setObjects([Objects.hat, , Objects.sunscreen, Objects.sunglasses]);
    } else if (
      results.weather[0].main === "Rain" ||
      results.weather[0].main === "Thunderstorm" ||
      results.weather[0].main === "Drizzle" ||
      results.weather[0].main === "Tornado" ||
      results.weather[0].main === "Squall"
    ) {
      setObjects([Objects.raincoat, Objects.umbrella, Objects.boots]);
    } else if (
      results.weather[0].main === "Mist" ||
      results.weather[0].main === "Smoke" ||
      results.weather[0].main === "Haze" ||
      results.weather[0].main === "Fog"
    ) {
      setObjects([Objects.torch, Objects.Coat]);
    } else if (results.weather[0].main === "Snow") {
      setObjects([Objects.coat, Objects.scarf, Objects.boots]);
    } else if (results.weather[0].main === "Clouds") {
      setObjects([Objects.coat, Objects.hat]);
    } else if (
      results.weather[0].main === "Ash" ||
      results.weather[0].main === "Dust" ||
      results.weather[0].main === "Sand"
    ) {
      setObjects([Objects.Hat, Objects.Glasses]);
    }
  }

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric" +
        "&appid=" +
        process.env.REACT_APP_APIKEY
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result["cod"] !== 200) {
            setIsLoaded(false);
          } else {
            setIsLoaded(true);
            setResults(result);
            bringRightThings(result);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [city]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <img className="logo" src={logo} alt="MLH Prep Logo"></img>
        <div>
          <h2>Enter a city below 👇</h2>
          <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <div className="Results">
            {!isLoaded && <h2>Loading...</h2>}
            {isLoaded && results && (
              <>
                <h3>{results.weather[0].main}</h3>
                <p>Feels like {results.main.feels_like}°C</p>
                <i>
                  <p>
                    {results.name}, {results.sys.country}
                  </p>
                </i>
              </>
            )}
          </div>
        </div>
        <div className="cards">
          {objects &&
            objects.map((object) => {
              let key = Object.keys(Objects).filter(function (key) {
                return Objects[key] === object;
              });

              return (
                <div className="card">
                  {" "}
                  <ItemCard name={key} image={object} />{" "}
                </div>
              );
            })}
        </div>
      </>
    );
  }
}

export default App;
