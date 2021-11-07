import './App.css';
import {useState} from 'react';
import Axios from 'axios';

function App() {

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

  const [countryList, setCountryList] = useState([]);
  
  const addCountry = () => {
    Axios.post("http://localhost:3001/create", {
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
    Axios.get("http://localhost:3001/list").then((response) => {
        setCountryList(response.data);
    }); 
  }

  return (
    <div className="App">
      <div className="information">
        <label>Complete Name</label>
        <input type="text" onChange={(event) => {
            setName(event.target.value);
          }}/>
        <label>Country</label>
        <select onChange={(event) => {
            setCountry(event.target.value);
          }}>
          <option selected value="Seleccionar">Seleccionar</option>
          <option value="londres">londres</option>
          <option value="lima">Lima</option>
          <option value="colombia">colombia</option>
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
