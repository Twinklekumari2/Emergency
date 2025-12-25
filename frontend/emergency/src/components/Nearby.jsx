import React, { useEffect, useState } from 'react'
import './../styles/nearby.css'
import getUserLocation from './../script/location.js'
import Card from './Card.jsx'
import {api} from '../api.js'

const Nearby = () => {
  const [toggleScreen, setToggleScreen] = useState(false);
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [hospitals, setHospitals] = useState([]);

  const getCityHospitals = async (cityName) => {
    const res = await api.get(`/location/city/${cityName}`);
    return res.data.response;
  };

  const getStateHospitals = async (state) => {
    const res = await api.get(`/location/state/${state}`);
    return res.data.response;
  };

  useEffect(() => {
    const storedCity = localStorage.getItem("city");
    const storedState = localStorage.getItem("state");

    const loadHospitals = async (cityName, state) => {
      let data = await getCityHospitals(cityName);
      if (!data.length && state) {
        data = await getStateHospitals(state);
      }
      setHospitals(data);
      setToggleScreen(true);
    };

    if (storedCity && storedState) {
      setCity(storedCity);
      setStateName(storedState);
      loadHospitals(storedCity, storedState);
      return;
    }

    const fetchLocation = async () => {
      const address = await getUserLocation();
      const cityName = address.city || address.town || address.village || "";
      const state = address.state || "";

      setCity(cityName);
      setStateName(state);

      localStorage.setItem("city", cityName);
      localStorage.setItem("state", state);

      loadHospitals(cityName, state);
    };

    fetchLocation();
  }, []);

  return (
    <div className='near-by'>
      <h2>Hospitals near you ({city || stateName})</h2>

      <div className='hospital-list'>
        {toggleScreen &&
          hospitals.map(h => (
            <Card key={h._id} data={h} />
          ))}
      </div>
    </div>
  );
};

export default Nearby;
