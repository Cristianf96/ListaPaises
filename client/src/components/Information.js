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
        <h1>Date Country</h1>
        <div className="mb-3">
        <label className="form-label">Complete Name</label>
        <input
          name="name"
          type="text"
          className="form-control"
          placeholder="Escriba su Nombre"
          onChange={(event) => {
            setName(event.target.value);
          }}
          pattern="[a-zA-Z ]{2,254}"
          title="Solo Alfabeticos en MAYUSCULAS o minusculas"
          required
        />
        </div>
        <div className="mb-3">

        <label className="form-label">Country</label>
        <select
          name="country"
          className="form-select"
          aria-label=".form-select-sm example"
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
          <button className="btn btn-outline-primary">Add Information</button>
        </div>
      </form>
    </Fragment>
  );
};

export default Information;
