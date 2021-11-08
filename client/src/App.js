import React, { useEffect } from 'react';
import './App.css';
import {useState} from 'react';
import Axios from 'axios';

function App() {
  
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [listCountry, setListCountry] = useState([]);

  const addCountry = () => {
    Axios.post("https://apilista.herokuapp.com/create", {
      name: name,
      country: country
    }).then(() => {
        setCountryList([
          ...countryList,{
            name: name,
            country: country
          }
        ])
    }); 
  }

  const getCountry = () => {
    Axios.get("https://apilista.herokuapp.com/list").then((response) => {
        setCountryList(response.data);
    }); 
  }

  useEffect(() =>{
    fetch('https://restcountries.com/v2/all')
    .then((response) => {
      return response.json()
    }).then((data) => {
      setListCountry(data)
      console.log(data)
    })
    .catch(() => {
      console.log('error, fetch')
    })
  }, [])

  return (
    <div className="App">
      <div className="information">
        <label>Complete Name</label>
        <input type="text" onChange={(event) => {
            setName(event.target.value);
          }} placeholder="Escriba su Nombre"/>
        <label>Country</label>
        <select onChange={(event) => {
            setCountry(event.target.value);
          }}>
            {listCountry.map(({name}) => {
              return(
                <option value={name}>{name}</option>
              )
            })}
        </select>
        <button onClick={addCountry}>Add Information</button>
      </div>
      <div className="list">
      <button onClick={getCountry}>Show List</button>

      {countryList.map((val, key) => {
        return <div className="countrylist">
                  <h4>Name: {val.name}</h4>
                  <h4>Country: {val.country}</h4>
                </div>;
      })}
      </div>
    </div>
  );
}

export default App;
