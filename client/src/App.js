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
    <div className="container">
      <div className="row">
        <div className="col">
          <Information />
          <button onClick={getCountry} className="btn btn-outline-info">
            Show List
          </button>
        </div>
        <div className="col">
          <table className="table table-hover">
            <thead>
              <tr className="table-light">
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>
              {countryList.map((val, key) => {
                return (
                  <tr>
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td>{val.country}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
