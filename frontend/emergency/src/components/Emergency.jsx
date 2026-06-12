import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faLocationDot, faCircleDot, faPhone, faEnvelope, faGlobe, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';

const Emergencyy = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.hospital;

  if (!data) {
    return (
      <div className="min-h-screen bg-[#000000] text-stone-400 flex items-center justify-center font-mono text-xs uppercase tracking-widest">
        No operational data found in current state context.
      </div>
    );
  }

  const handleCopyId = () => {
    navigator.clipboard.writeText(data._id);
    toast.success("Hospital node ID copied to clipboard");
  };

  const isAccepting = data.isAcceptingEmergency === "true" || data.isAcceptingEmergency === true;

  // Shared structural styling properties
  const cardStyles = "bg-[#111111] p-6 rounded-sm border border-stone-900 shadow-2xl space-y-4";
  const sectionTitleStyles = "text-xs font-mono font-bold tracking-widest text-white uppercase border-b border-stone-950 pb-2.5 flex items-center gap-2";
  const dataRowStyles = "flex justify-between items-center py-2 border-b border-stone-950/60 text-sm font-mono text-stone-400";

  return (
    <div className="min-h-screen bg-[#000000] text-stone-200 antialiased pt-[12vh] pb-24 selection:bg-red-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* ----------- EDITORIAL MASTER HEAD ----------- */}
        <header className="border-b border-stone-900 pb-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <span className="font-mono text-[10px] bg-stone-900 border border-stone-800 text-stone-400 px-2.5 py-1 rounded-sm uppercase tracking-wide">
                REG: {data.registrationNo}
              </span>
              <button 
                onClick={handleCopyId}
                className="font-mono text-[10px] bg-red-950/20 border border-red-900/40 text-red-400 hover:text-white hover:border-red-600 px-2.5 py-1 rounded-sm uppercase tracking-wide flex items-center gap-1.5 transition-all"
              >
                NODE: {data._id.substring(0, 8)}... <FontAwesomeIcon icon={faClipboard} />
              </button>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-none">
              {data.hospitalName}
            </h1>
          </div>

          {/* Core Master Action Button */}
          <button
            onClick={() => navigate('/ambulance')}
            className="w-full md:w-auto px-8 py-4 font-mono font-black text-xs tracking-widest uppercase text-white bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 rounded-sm shadow-xl shadow-red-950/40 transform active:scale-[0.99] transition-all"
          >
            Dispatch Emergency Request
          </button>
        </header>

        {/* ----------- CONTROL PANEL MATRIX GRID ----------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SYSTEM SECTION: LIVE MONITORING (7 / 12 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Live Availability Feed Container */}
            <div className={`${cardStyles} relative overflow-hidden`}>
              <div className={`absolute top-0 left-0 w-[2px] h-full ${isAccepting ? 'bg-emerald-500' : 'bg-red-600'}`}></div>
              <h3 className={sectionTitleStyles}>
                <span className={`w-1.5 h-1.5 rounded-full ${isAccepting ? 'bg-emerald-500 animate-pulse' : 'bg-red-600'}`}></span>
                Live Transmission Status
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-[#000000] border border-stone-950 p-4 rounded-sm text-center space-y-1">
                  <span className="block font-mono text-[9px] tracking-widest text-stone-600 uppercase font-black">Intake Access</span>
                  <span className={`inline-block font-mono text-xs font-black px-2 py-0.5 rounded-sm ${
                    isAccepting ? 'text-emerald-500 bg-emerald-950/20' : 'text-red-500 bg-red-950/20'
                  }`}>
                    {isAccepting ? 'OPEN / ACTIVE' : 'DIVERTED'}
                  </span>
                </div>
                <div className="bg-[#000000] border border-stone-950 p-4 rounded-sm text-center space-y-1">
                  <span className="block font-mono text-[9px] tracking-widest text-stone-600 uppercase font-black">Vacant Beds</span>
                  <span className="text-xl font-mono font-black text-white">{data.availableBeds || 0}</span>
                </div>
                <div className="bg-[#000000] border border-stone-950 p-4 rounded-sm text-center space-y-1">
                  <span className="block font-mono text-[9px] tracking-widest text-stone-600 uppercase font-black">Available Fleet</span>
                  <span className="text-xl font-mono font-black text-red-500">{data.availableAmbulances || 0}</span>
                </div>
              </div>
            </div>

            {/* Static Infrastructure Capabilities */}
            <div className={cardStyles}>
              <h3 className={sectionTitleStyles}>Infrastructure Resources</h3>
              <div className="space-y-1">
                <div className={dataRowStyles}><span>Gross Layout Beds</span><span className="text-white font-bold">{data.totalBeds}</span></div>
                <div className={dataRowStyles}><span>Active ICU Beds</span><span className="text-white">{data.icuBeds}</span></div>
                <div className={dataRowStyles}><span>Oxygen Line Secured Beds</span><span className="text-white">{data.oxygenBeds}</span></div>
                <div className={dataRowStyles}><span>Mechanical Ventilators</span><span className="text-white">{data.ventilators}</span></div>
                <div className={dataRowStyles}><span>Ambulance Vehicle Count</span><span className="text-white">{data.ambulanceCount}</span></div>
                <div className={dataRowStyles}><span>24x7 Operations Protocol</span><span className="text-white font-bold tracking-wide">{data.is24X7 || "Yes"}</span></div>
              </div>
              <div className="pt-2">
                <span className="block font-mono text-[9px] tracking-widest text-stone-600 uppercase font-black mb-1">Departments</span>
                <p className="text-sm text-stone-300 leading-relaxed font-sans">{data.departments}</p>
              </div>
            </div>

          </div>

          {/* RIGHT SYSTEM SECTION: LOGISTICS & COMMS (5 / 12 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Address & Geocode Mapping */}
            <div className={cardStyles}>
              <h3 className={sectionTitleStyles}>
                <FontAwesomeIcon icon={faLocationDot} className="text-stone-600 text-xs" /> Geographic Coordinates
              </h3>
              <div className="font-mono text-sm space-y-1 text-stone-400">
                <p className="text-white font-bold uppercase tracking-tight text-md">{data.city}</p>
                <p className="text-stone-400 text-xs">{data.addressLine1}</p>
                <p className="text-stone-500 text-xs">{data.addressLine2}</p>
                <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-stone-500 border-t border-stone-950 mt-2">
                  <div><span>District:</span> <span className="text-stone-300">{data.district}</span></div>
                  <div><span>State:</span> <span className="text-stone-300">{data.state}</span></div>
                  <div className="col-span-2"><span>Pincode Anchor:</span> <span className="text-stone-300 font-bold">{data.pincode}</span></div>
                </div>
              </div>
            </div>

            {/* Direct Communication Channels */}
            <div className={cardStyles}>
              <h3 className={sectionTitleStyles}>Communication Suite</h3>
              <div className="space-y-3 font-mono text-xs text-stone-400">
                <div className="flex items-center gap-3 bg-[#000000] p-2.5 rounded-sm border border-stone-950">
                  <FontAwesomeIcon icon={faPhone} className="text-red-500" />
                  <div>
                    <span className="text-[8px] text-stone-600 block uppercase">Emergency Line</span>
                    <span className="text-white font-bold">{data.emergencyPhone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-[#000000] p-2.5 rounded-sm border border-stone-950">
                  <FontAwesomeIcon icon={faPhone} className="text-stone-600" />
                  <div>
                    <span className="text-[8px] text-stone-600 block uppercase">Office Telephone</span>
                    <span className="text-stone-300">{data.officialPhone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-[#000000] p-2.5 rounded-sm border border-stone-950">
                  <FontAwesomeIcon icon={faEnvelope} className="text-stone-600" />
                  <div className="truncate">
                    <span className="text-[8px] text-stone-600 block uppercase">Official Email</span>
                    <span className="text-stone-300">{data.officialEmail}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-[#000000] p-2.5 rounded-sm border border-stone-950">
                  <FontAwesomeIcon icon={faGlobe} className="text-stone-600" />
                  <div className="truncate">
                    <span className="text-[8px] text-stone-600 block uppercase">Web Domain</span>
                    <a href={data.website} target="_blank" rel="noreferrer" className="text-red-400 hover:text-red-500 underline transition-colors">{data.website}</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Administrative Personnel Log */}
            <div className={cardStyles}>
              <h3 className={sectionTitleStyles}>
                <FontAwesomeIcon icon={faUserShield} className="text-stone-600 text-xs" /> Node Authority
              </h3>
              <div className="font-mono text-xs space-y-2">
                <div className="flex justify-between border-b border-stone-950 pb-1.5">
                  <span className="text-stone-600 uppercase text-[10px]">Supervisor</span>
                  <span className="text-stone-200 font-bold">{data.adminName}</span>
                </div>
                <div className="flex justify-between border-b border-stone-950 pb-1.5">
                  <span className="text-stone-600 uppercase text-[10px]">Role Core</span>
                  <span className="text-stone-400">{data.adminRole}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-stone-600 uppercase text-[10px]">Secure Link</span>
                  <span className="text-stone-400">{data.adminPhone}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Emergencyy;