import React, { Fragment, useState, useEffect } from "react";
import Axios from "axios";

const Information = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [listCountry, setListCountry] = useState([]);

  const addCountry = (e) => {
    e.preventDefault();
    Axios.post("https://apilista.herokuapp.com/create", {
      name: name,
      country: country,
    });
  };

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setListCountry(data);
        console.log(data);
      })
      .catch(() => {
        console.log("error, fetch");
      });
  }, []);

  return (
    <Fragment>
      <form onSubmit={addCountry}>
        <h1>information</h1>
        <label>Complete Name</label>
        <input
          name="name"
          type="text"
          placeholder="Escriba su Nombre"
          onChange={(event) => {
            setName(event.target.value);
          }}
          pattern="[a-zA-Z]+"
          title="Solo Alfabeticos en MAYUSCULAS o minusculas"
          required
        />
        <label>Country</label>
        <select
          name="country"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
          required
        >
          <option value=""></option>
          {listCountry.map(({ name }) => {
            return (
              <option key={name} value={name}>
                {name}
              </option>
            );
          })}
        </select>
        <button>Add Information</button>
      </form>
    </Fragment>
  );
};

export default Information;
