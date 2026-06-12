import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAmbulance, faBed, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const Card = ({ data }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/emergency/hospital', {
      state: { hospital: data }
    });
  };

  const hasAmbulances = data.availableAmbulances > 0;

  return (
    /* h-full and flex flex-col ensure that if the parent grid container stretches 
       to match the tallest card, this component stretches perfectly with it */
    <div className="w-full h-full bg-[#111111] border border-stone-900 p-4 rounded-sm flex flex-col justify-between space-y-4 relative overflow-hidden group transition-all duration-300 hover:border-stone-800">
      
      {/* Structural Emergency Status Flag Line along the edge */}
      <div className={`absolute top-0 left-0 w-[2px] h-full transition-colors duration-300 ${
        hasAmbulances ? 'bg-emerald-500' : 'bg-red-600'
      }`}></div>

      {/* ----------- CARD TOP CONTENT ----------- */}
      <div className="space-y-4 pl-1 flex-1 flex flex-col justify-between">
        
        {/* Hospital Graphic Thumbnail */}
        <div className="relative rounded-sm overflow-hidden border border-stone-950 bg-stone-950 flex-shrink-0">
          <img 
            src={data.imageOfHospital} 
            alt="Hospital facility blueprint" 
            loading="lazy" 
            className="w-full h-44 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
          />
          {/* Overlay Text Plate */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-8">
            <h3 className="text-sm font-black text-white tracking-tight uppercase line-clamp-1">
              {data.hospitalName}
            </h3>
          </div>
        </div>

        {/* Dynamic Telemetry Layout (Enforces clean columns on desktop, stacks gracefully on small mobile screens) */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs font-mono items-stretch flex-1">
          
          {/* Dispatch Telemetry Block (3 Columns) */}
          <div className="sm:col-span-3 bg-[#000000] border border-stone-950 p-2 rounded-sm flex flex-row sm:flex-col justify-between items-center sm:justify-center gap-1.5 text-center">
            <FontAwesomeIcon icon={faAmbulance} className="text-stone-500 text-sm" />
            <div>
              <span className="block text-[8px] text-stone-600 uppercase font-black tracking-wider sm:mb-0.5">Fleet</span>
              <span className={`inline-block text-xs font-black px-2 py-0.5 rounded-sm ${
                hasAmbulances ? 'text-emerald-500 bg-emerald-950/20' : 'text-red-500 bg-red-950/20'
              }`}>
                {data.availableAmbulances || 0}
              </span>
            </div>
          </div>

          {/* Bed Inventory Metrics Block (5 Columns) */}
          <div className="sm:col-span-5 bg-[#000000] border border-stone-950 p-2.5 rounded-sm flex flex-col justify-center space-y-1 text-[11px]">
            <span className="block font-sans text-[8px] text-stone-600 uppercase font-black tracking-widest pb-0.5 mb-0.5 border-b border-stone-900 flex items-center gap-1">
              <FontAwesomeIcon icon={faBed} className="text-stone-700" /> Bed Matrix
            </span>
            <div className="flex justify-between text-stone-500"><span>Gross:</span><span className="text-stone-300 font-bold">{data.totalBeds}</span></div>
            <div className="flex justify-between text-stone-500"><span>ICU:</span><span className="text-stone-300">{data.icuBeds}</span></div>
            <div className="flex justify-between text-stone-500"><span>O2:</span><span className="text-stone-300">{data.oxygenBeds}</span></div>
            <div className="flex justify-between text-stone-600 font-bold border-t border-stone-950 pt-0.5 mt-0.5"><span>Vacant:</span><span className="text-red-500">{data.availableBeds}</span></div>
          </div>

          {/* Physical Address Block (4 Columns) */}
          <div className="sm:col-span-4 bg-[#000000] border border-stone-950 p-2.5 rounded-sm flex flex-col justify-center text-[10px] text-stone-400 space-y-0.5 leading-tight">
            <FontAwesomeIcon icon={faLocationDot} className="text-stone-700 self-start mb-1 text-xs" />
            <p className="truncate text-stone-300 font-bold uppercase">{data.city}</p>
            <p className="truncate text-stone-500">{data.addressLine1}</p>
            <p className="truncate text-stone-600">{data.addressLine2}</p>
            <p className="truncate text-[9px] text-stone-600">{data.state} ({data.pincode})</p>
          </div>

        </div>

      </div>

      {/* ----------- CARD BOTTOM ACTION LAYOUT ----------- */}
      <div className="pt-3 border-t border-stone-950 pl-1 flex-shrink-0 mt-auto">
        <button 
          onClick={handleClick}
          className="w-full py-2.5 font-mono text-xs font-black tracking-widest uppercase text-stone-300 bg-[#000000] border border-stone-800 hover:border-stone-600 hover:text-white rounded-sm shadow-md transition-all duration-200 active:scale-[0.99]"
        >
          See More Node Data
        </button>
      </div>

    </div>
  );
};

export default Card;