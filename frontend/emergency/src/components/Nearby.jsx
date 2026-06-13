import React, { useEffect, useState } from 'react';
import getUserLocation from './../script/location.js';
import Card from './Card.jsx';
import { api } from '../api.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNodes, faLocationCrosshairs, faSpinner, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

const Nearby = () => {
  const [toggleScreen, setToggleScreen] = useState(false);
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // NEW STATE: Track search queries
  const [searchQuery, setSearchQuery] = useState("");

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

      const cachedHospitals = sessionStorage.getItem(`cached_hospitals_${cityName}`);
      
      if (cachedHospitals) {
        setHospitals(JSON.parse(cachedHospitals));
        setToggleScreen(true);
        setLoading(false);
        return; 
      }

      let data = await getCityHospitals(cityName);
      if (!data.length && state) {
        data = await getStateHospitals(state);
      }
      
      setHospitals(data);
      setToggleScreen(true);
      setLoading(false);

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

  // NEW COMPUTED PROPERTY: Filter hospitals array dynamically based on parameters
  const filteredHospitals = hospitals.filter((hospital) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true; // If search bar is blank, show everything

    // Safeguards against undefined data paths inside your schema layout
    const nameMatch = hospital.name?.toLowerCase().includes(query);
    const cityMatch = hospital.city?.toLowerCase().includes(query);
    const stateMatch = hospital.state?.toLowerCase().includes(query);
    const regMatch = hospital.registrationNumber?.toLowerCase().includes(query) || 
                     hospital.regNo?.toLowerCase().includes(query); // Adapts to your naming scheme

    return nameMatch || cityMatch || stateMatch || regMatch;
  });

  return (
    <div className="min-h-screen bg-[#000000] text-stone-200 antialiased pt-[12vh] pb-24 selection:bg-red-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ----------- DIRECTORY HEADER TRACKER ----------- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-900 pb-6 mb-8 text-center md:text-left">
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

        {/* ----------- NEW SEARCH FILTER CONSOLE ----------- */}
        {!loading && hospitals.length > 0 && (
          <div className="mb-8 max-w-xl">
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-stone-600 group-focus-within:text-red-500 transition-colors" />
              </span>
              <input
                type="text"
                placeholder="Search by name, city, state, or reg number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0d0d0d] border border-stone-950 text-white placeholder-stone-600 text-sm rounded-sm pl-10 pr-10 py-3 font-mono tracking-wide transition-all duration-200 focus:outline-none focus:border-red-600 focus:bg-[#111111]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-500 hover:text-white"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="mt-2 font-mono text-[10px] text-stone-500 uppercase tracking-widest">
                Filtered Results: <span className="text-red-500">{filteredHospitals.length}</span> / {hospitals.length} Nodes found
              </div>
            )}
          </div>
        )}

        {/* ----------- ACTIVE GEOLOCATION STATE LOGIC ----------- */}
        {loading ? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center space-y-4 bg-[#111111] border border-stone-900 rounded-sm p-12">
            <FontAwesomeIcon icon={faSpinner} className="text-red-600 text-3xl animate-spin" />
            <p className="font-mono text-xs tracking-widest uppercase text-stone-500">
              Querying Regional Network Nodes...
            </p>
          </div>
        ) : toggleScreen && filteredHospitals.length > 0 ? (
          
          /* CRITICAL GRID RESOLUTION: Fluid cards list */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredHospitals.map(h => (
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
              <h3 className="text-md font-bold uppercase tracking-tight text-white">
                {searchQuery ? "No Filtering Matches" : "No Active Nodes Located"}
              </h3>
              <p className="font-mono text-xs text-stone-500 max-w-sm">
                {searchQuery 
                  ? `Your search filter criteria "${searchQuery}" didn't map to any cached hospital data targets.`
                  : `No hospitals in "${city || stateName}" have connected to the instant response portal yet.`}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Nearby;