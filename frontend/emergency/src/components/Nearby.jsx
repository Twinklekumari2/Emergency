import React, { useEffect, useState } from 'react';
import getUserLocation from './../script/location.js';
import Card from './Card.jsx';
import { api } from '../api.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNodes, faLocationCrosshairs, faSpinner } from "@fortawesome/free-solid-svg-icons";

const Nearby = () => {
  const [toggleScreen, setToggleScreen] = useState(false);
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCityHospitals = async (cityName) => {
    try {
      const res = await api.get(`/location/city/${cityName}`);
      return res.data.response;
    } catch (err) {
      console.error("City node lookup interrupted:", err);
      return [];
    }
  };

  const getStateHospitals = async (state) => {
    try {
      const res = await api.get(`/location/state/${state}`);
      return res.data.response;
    } catch (err) {
      console.error("State node lookup interrupted:", err);
      return [];
    }
  };

  useEffect(() => {
    const storedCity = localStorage.getItem("city");
    const storedState = localStorage.getItem("state");

    const loadHospitals = async (cityName, state) => {
      setLoading(true);

      // 🔥 CRITICAL OPTIMIZATION: Check if hospital data array is already cached
      const cachedHospitals = sessionStorage.getItem(`cached_hospitals_${cityName}`);
      
      if (cachedHospitals) {
        setHospitals(JSON.parse(cachedHospitals)); // Pull array cleanly from storage
        setToggleScreen(true);
        setLoading(false);
        return; // Network API pipeline completely bypassed!
      }

      // Fallback: Fetch from database if cache is empty
      let data = await getCityHospitals(cityName);
      if (!data.length && state) {
        data = await getStateHospitals(state);
      }
      
      setHospitals(data);
      setToggleScreen(true);
      setLoading(false);

      // 🔥 CACHE RESPONSE DATA: Save array payload for upcoming instances
      if (data.length > 0) {
        sessionStorage.setItem(`cached_hospitals_${cityName}`, JSON.stringify(data));
      }
    };

    if (storedCity && storedState) {
      setCity(storedCity);
      setStateName(storedState);
      loadHospitals(storedCity, storedState);
      return;
    }

    const fetchLocation = async () => {
      try {
        setLoading(true);
        const address = await getUserLocation();
        const cityName = address.city || address.town || address.village || "";
        const state = address.state || "";

        setCity(cityName);
        setStateName(state);

        localStorage.setItem("city", cityName);
        localStorage.setItem("state", state);

        await loadHospitals(cityName, state);
      } catch (err) {
        console.error("Geolocation tracking denied:", err);
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-stone-200 antialiased pt-[12vh] pb-24 selection:bg-red-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ----------- DIRECTORY HEADER TRACKER ----------- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-900 pb-6 mb-10 text-center md:text-left">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-red-500 font-bold uppercase tracking-wider">
              <FontAwesomeIcon icon={faLocationCrosshairs} className="animate-pulse" /> Live Tracking Grid
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Hospitals Near You
            </h2>
          </div>
          
          <div className="bg-[#111111] border border-stone-900 px-4 py-2 rounded-sm inline-flex items-center justify-center gap-2 mx-auto md:mx-0">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            <span className="font-mono text-xs tracking-widest uppercase text-stone-400 font-bold">
              Zone: <span className="text-white">{city || stateName || "Detecting..."}</span>
            </span>
          </div>
        </header>

        {/* ----------- ACTIVE GEOLOCATION STATE LOGIC ----------- */}
        {loading ? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center space-y-4 bg-[#111111] border border-stone-900 rounded-sm p-12">
            <FontAwesomeIcon icon={faSpinner} className="text-red-600 text-3xl animate-spin" />
            <p className="font-mono text-xs tracking-widest uppercase text-stone-500">
              Querying Regional Network Nodes...
            </p>
          </div>
        ) : toggleScreen && hospitals.length > 0 ? (
          
          /* CRITICAL GRID RESOLUTION: Fluid cards list */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {hospitals.map(h => (
              <div key={h._id} className="flex flex-col h-full transition-transform duration-200 hover:scale-[1.01]">
                <Card data={h} />
              </div>
            ))}
          </div>

        ) : (
          /* NO RESPONDING NODES FOUND DIAGNOSTIC */
          <div className="min-h-[40vh] flex flex-col items-center justify-center text-center space-y-4 bg-[#111111] border border-stone-900 rounded-sm p-12">
            <FontAwesomeIcon icon={faCircleNodes} className="text-stone-700 text-4xl" />
            <div className="space-y-1">
              <h3 className="text-md font-bold uppercase tracking-tight text-white">No Active Nodes Located</h3>
              <p className="font-mono text-xs text-stone-500 max-w-sm">
                No hospitals in "{city || stateName}" have connected to the instant response portal yet.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Nearby;