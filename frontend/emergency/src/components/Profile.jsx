import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faPen, faXmark, faCheck, faRightFromBracket, faPlus, faBell } from "@fortawesome/free-solid-svg-icons";
import DriverDetails from './DriverDetails';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { socket } from './../../socket.js';
import { toast } from 'react-toastify';

const Profile = ({ data }) => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...data });

  const [ambulanceData, setAmbulanceData] = useState({
    hospitalId: data._id,
    driverName: "",
    contact: "",
    status: "",
  });

// 🔥 SOCKET INTERACTION LAYER
  useEffect(() => {
    // 1. Establish real-time link manually
    socket.connect();

    // 2. Room initialization request to grid matrix
    socket.emit('join_hospital_room', data._id);

    // 3. Setup dynamic listener for instant SOS broadcasts
    socket.on('incoming_broadcast_ping', (activeEmergency) => {
      console.log("💥 CRITICAL PATIENT INBOUND TELEMETRY:", activeEmergency);
      
      // Infinite toast configuration block to mandate user verification click
      toast.error(
        <div>
          <p className="font-sans font-black tracking-wide text-white uppercase mb-1">⚠️ CRITICAL INBOUND EMERGENCY</p>
          <p className="font-mono text-[10px] text-stone-300">New emergency incident reported inside your perimeter grid!</p>
          <button 
            onClick={() => navigate('/requests', { state: { hospitalData: data } })}
            className="mt-2 w-full py-1 bg-white text-black font-mono text-[10px] font-black rounded-sm tracking-widest uppercase hover:bg-stone-200 transition-all"
          >
            RESPOND VIA CONSOLE
          </button>
        </div>,
        { autoClose: false, closeOnClick: false, draggable: false }
      );
    });

    // 4. Safe cleanup protocol on dashboard shutdown/unmount
    return () => {
      socket.off('incoming_broadcast_ping');
      socket.disconnect();
    };
  }, [data._id, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("hospital");
    window.location.href = '/login/hospital';
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeAmbulance = (e) => {
    setAmbulanceData({ ...ambulanceData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("hospital");
      await api.post(
        `/hospital/ambulance/${data._id}`,
        ambulanceData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Driver details added successfully");
      
      // Clear input fields safely
      setAmbulanceData({
        hospitalId: data._id,
        driverName: "",
        contact: "",
        status: "",
      });
      e.target.reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to append driver protocols.");
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("hospital");
      await api.put(
        `/hospital/update/${formData._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Profile records updated.");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      toast.error("Profile synchronization failure.");
    }
  };

  const handleCancel = () => {
    setFormData({ ...data });
    setEditMode(false);
  };

  // Reusable core interface class properties
  const cardStyles = "bg-[#111111] p-6 rounded-sm border border-stone-900 shadow-2xl space-y-4";
  const labelStyles = "block font-mono text-[10px] tracking-widest text-stone-500 uppercase font-bold mb-1";
  const inputStyles = "w-full bg-[#000000] border border-stone-800 focus:border-red-600 rounded-sm p-2 text-sm text-stone-200 placeholder-stone-700 outline-none transition-all";
  const inlineDataRow = "flex justify-between items-center py-2 border-b border-stone-950 text-sm";

  return (
    <div className="min-h-screen bg-[#000000] text-stone-200 antialiased pt-[12vh] pb-24 selection:bg-red-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ----------- ACTION STATUS HEADER RUNNER ----------- */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-900 pb-6 mb-8">
          <div className="text-center sm:text-left">
            <span className="font-mono text-xs text-red-500 font-bold uppercase tracking-wider">Control Panel</span>
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">Hospital Infrastructure</h1>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            <button 
              onClick={() => navigate('/requests', {state: {hospitalData: data}})}
              className="flex items-center gap-2 px-4 py-2 font-mono text-xs font-bold tracking-wider uppercase text-white bg-red-600 hover:bg-red-500 rounded-sm transition-all"
            >
              <FontAwesomeIcon icon={faBell} className="animate-bounce" /> Requests
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 font-mono text-xs font-bold tracking-wider uppercase text-stone-400 bg-[#111111] border border-stone-800 hover:text-white hover:border-stone-600 rounded-sm transition-all"
            >
              <FontAwesomeIcon icon={faRightFromBracket} /> Logout
            </button>
          </div>
        </header>

        {/* ----------- MAIN FLUID RESPONSIVE HUB GRID ----------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMN LEFT: CORE MATRICES (7 / 12 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Identity Profile Badge Card */}
            <div className={`${cardStyles} relative overflow-hidden`}>
              <div className="absolute top-0 left-0 w-[2px] h-full bg-red-600"></div>
              
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <img 
                  src={formData.imageOfHospital} 
                  alt="Registered Facility" 
                  className="w-24 h-24 rounded-sm border border-stone-800 object-fit filter opacity-90 flex-shrink-0"
                />
                <div className="flex-1 space-y-3 text-center sm:text-left w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-mono text-[10px] tracking-widest text-stone-500 font-bold block">{formData.registrationNo}</span>
                      {editMode ? (
                        <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} className={`${inputStyles} text-lg font-bold mt-1`} />
                      ) : (
                        <h2 className="text-xl font-black text-white uppercase tracking-tight">{formData.hospitalName}</h2>
                      )}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <a href={formData.website} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-sm bg-[#000000] border border-stone-800 hover:border-stone-600 text-stone-400 hover:text-white flex items-center justify-center text-sm transition-all">
                        <FontAwesomeIcon icon={faGlobe} />
                      </a>
                      {!editMode && (
                        <button onClick={() => setEditMode(true)} className="px-3 py-1.5 font-mono text-[10px] font-bold tracking-wider text-stone-300 border border-stone-800 hover:border-stone-600 rounded-sm flex items-center gap-1.5 transition-all">
                          <FontAwesomeIcon icon={faPen} /> EDIT
                        </button>
                      )}
                    </div>
                  </div>

                  {editMode ? (
                    <div className="pt-2">
                      <label className={labelStyles}>Official Communications Email</label>
                      <input type="email" name="officialEmail" value={formData.officialEmail} onChange={handleChange} className={inputStyles} />
                    </div>
                  ) : (
                    <p className="text-sm font-mono text-stone-400">{formData.officialEmail}</p>
                  )}
                  
                  <p className="text-xs text-stone-500 font-mono uppercase tracking-wider">
                    {formData.hospitalType} • {formData.ownership} • EST. {formData.establishedYear}
                  </p>
                </div>
              </div>
            </div>

            {/* Admin Personnel Profile Box */}
            <div className={cardStyles}>
              <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase border-b border-stone-950 pb-2">
                Administrative Authority
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-stone-400">
                <div><span className="text-stone-600 block text-[10px] uppercase">Name</span><span className="text-stone-200 font-bold">{formData.adminName}</span></div>
                <div><span className="text-stone-600 block text-[10px] uppercase">Role Designation</span><span className="text-stone-300">{formData.adminRole}</span></div>
                <div><span className="text-stone-600 block text-[10px] uppercase">Secure Comms</span><span className="text-stone-300">{formData.adminEmail}</span></div>
              </div>
            </div>

            {/* Appended Sub-Module Component */}
            <div className="bg-[#111111] rounded-sm border border-stone-900 overflow-hidden">
              <DriverDetails hospitalId={data._id} />
            </div>
          </div>

          {/* COLUMN RIGHT: CONTROL MANAGEMENT & INVENTORY LATTICE (5 / 12 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* INVENTORY TRACKING SYSTEM SHEET */}
            <div className={cardStyles}>
              <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase border-b border-stone-950 pb-2">
                Live Grid Inventory Capacity
              </h3>
              
              <div className="space-y-1">
                {editMode ? (
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    {['ambulanceCount', 'availableAmbulances', 'totalBeds', 'icuBeds', 'oxygenBeds', 'availableBeds', 'ventilators'].map((field) => (
                      <div key={field}>
                        <label className={labelStyles}>{field.replace(/([A-Z])/g, ' $1')}</label>
                        <input type="number" name={field} value={formData[field]} onChange={handleChange} className={inputStyles} />
                      </div>
                    ))}
                    <div className="col-span-2 grid grid-cols-2 gap-3 pt-4">
                      <button onClick={handleSave} className="w-full py-2.5 bg-gradient-to-r from-red-700 to-red-600 text-white font-mono text-xs font-bold tracking-widest uppercase rounded-sm flex items-center justify-center gap-2"><FontAwesomeIcon icon={faCheck} /> SAVE</button>
                      <button onClick={handleCancel} className="w-full py-2.5 bg-stone-900 text-stone-400 font-mono text-xs font-bold tracking-widest uppercase rounded-sm flex items-center justify-center gap-2"><FontAwesomeIcon icon={faXmark} /> CANCEL</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={inlineDataRow}><span>Fleet Ambulances</span><span className="font-mono font-bold text-white">{formData.ambulanceCount}</span></div>
                    <div className={inlineDataRow}><span>Ready Fleet Available</span><span className="font-mono font-bold text-red-500">{formData.availableAmbulances}</span></div>
                    <div className={inlineDataRow}><span>Gross Layout Beds</span><span className="font-mono font-bold text-white">{formData.totalBeds}</span></div>
                    <div className={inlineDataRow}><span>Active ICU Beds</span><span className="font-mono font-bold text-white">{formData.icuBeds}</span></div>
                    <div className={inlineDataRow}><span>Oxygen Line Secured Beds</span><span className="font-mono font-bold text-white">{formData.oxygenBeds}</span></div>
                    <div className={inlineDataRow}><span>Vacant / Available Beds</span><span className="font-mono font-bold text-red-500">{formData.availableBeds}</span></div>
                    <div className={inlineDataRow}><span>Mechanical Ventilators</span><span className="font-mono font-bold text-white">{formData.ventilators}</span></div>
                    <div className="pt-3 text-right"><span className="font-mono text-[9px] tracking-wider text-stone-600 uppercase">Sync Check: {formData.lastUpdated}</span></div>
                  </>
                )}
              </div>
            </div>

            {/* ADD AMBULANCE PROTOCOL FORM SUBMISSION BLOCK */}
            <div className={cardStyles}>
              <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase border-b border-stone-950 pb-2">
                Append Dispatch Fleet Unit
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={labelStyles}>Driver Full Name</label>
                  <input type="text" name="driverName" placeholder="e.g. Satish Kumar" onChange={handleChangeAmbulance} className={inputStyles} required />
                </div>
                <div>
                  <label className={labelStyles}>Secure Contact Link</label>
                  <input type="tel" name="contact" placeholder="e.g. +91 95XXX XXXXX" onChange={handleChangeAmbulance} className={inputStyles} required />
                </div>
                <div>
                  <label className={labelStyles}>Initial Dispatch Status</label>
                  <select name="status" onChange={handleChangeAmbulance} className={inputStyles} required>
                    <option value="">Select Status Protocol</option>
                    <option value="available">Active / Available Now</option>
                    <option value="busy">Assigned / Engaged</option>
                  </select>
                </div>
                <div className="pt-2">
                  <button type="submit" className="w-full py-3 bg-[#000000] border border-stone-800 hover:border-stone-600 hover:text-white text-stone-300 font-mono text-xs font-bold tracking-widest uppercase rounded-sm flex items-center justify-center gap-2 transition-all">
                    <FontAwesomeIcon icon={faPlus} /> Append Fleet Unit
                  </button>
                </div>
              </form>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;