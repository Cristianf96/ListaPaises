import React, { useState } from "react";
import "./App.css";
import Axios from "axios";
import Information from "./components/Information";

function App() {
  const [countryList, setCountryList] = useState([]);

  const getCountry = () => {
    Axios.get("https://apilista.herokuapp.com/list").then((response) => {
      setCountryList(response.data);
    });
  };

  return (
    <div className="App">
      <div className="information">
        <Information />
      </div>
      <div className="list">
        <button onClick={getCountry}>Show List</button>
        <div>
          {countryList.map((val, key) => {
            return (
              <div className="countrylist">
                <h4>Name: {val.name}</h4>
                <h4>Country: {val.country}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
