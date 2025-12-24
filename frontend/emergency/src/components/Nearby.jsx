import React, { useEffect, useState } from 'react'
import './../styles/nearby.css'
import getUserLocation from './../script/location.js'
import Card from './Card.jsx'
import { api } from '../api.js'

const Nearby = () => {
    const [toggleScreen, setToggleScreen] = useState(false);
    const [city, setCity] = useState("");
    const [stateName, setStateName] = useState("");
    const [cityData, setCityData] = useState([]);

    const getDataCity = async (cityName) => {
        try {
            const url = `/location/city/${cityName}`;
            const res = await api.get(url);
            setCityData(res.data.response);
        } catch (err) {
            console.log("Error fetching city data:", err);
        }
    };

    useEffect(() => {
      const handleClick = async () => {
        try {
            const address = await getUserLocation();

            const cityName =
                address.city || address.town || address.village || "";
            const state =
                address.state || "";

            setCity(cityName);
            setStateName(state);
            setToggleScreen(true);

            if (cityName) {
                getDataCity(cityName);
            }
        } catch (err) {
            console.error("Error fetching location:", err);
            alert("Could not fetch location. Please type your city manually.");
        }
    };
    handleClick();
    }, [])

    return (
        <div className='near-by'>
            {!toggleScreen && (
                <div className='near-by-loc'>
                <div className='location-buttons'>
                    <div className='button'>
                        Fetch My Location
                    </div>
                </div>
                </div>
            )}
            <div className='hospital-page'>
              <h2>Hospital in your {city}</h2>
              <div className='hospital-list'>
              {toggleScreen && (
                <>  
                    {cityData.map((hospital) => (
                         <Card key={hospital._id} data={hospital} />
                    ))}
                </>
            )}
              </div>
            </div>
            
        </div>
    );
};

export default Nearby;
