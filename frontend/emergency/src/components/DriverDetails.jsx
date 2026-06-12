import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from './../api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark, faPenToSquare, faIdCard, faCircleDot } from "@fortawesome/free-solid-svg-icons";

const DriverDetails = ({ hospitalId }) => {
  const [details, setDetails] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [statusValue, setStatusValue] = useState("");

  useEffect(() => {
    const getDriversDetails = async () => {
      try {
        const token = localStorage.getItem("hospital");
        const res = await api.get("/hospital/ambulance", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDetails(res.data.response);
      } catch (err) {
        console.error("Data connection interrupted:", err);
      }
    };
    getDriversDetails();
  }, []);

  const handleEdit = (id, currentStatus) => {
    setEditingId(id);
    setStatusValue(currentStatus);
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("hospital");
      await api.put(
        `/hospital/ambulance/${id}`,
        { status: statusValue },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setDetails(prev =>
        prev.map(d => d._id === id ? { ...d, status: statusValue } : d)
      );

      toast.success("Node Status Synchronized");
      setEditingId(null);
    } catch (err) {
      console.error(err);
      toast.error("Node Update Protocol Failed");
    }
  };

  const inputStyles = "bg-[#000000] border border-stone-800 focus:border-red-600 rounded-sm p-1.5 text-xs text-stone-200 outline-none transition-all";

  return (
    <div className="p-6 bg-[#111111] border border-stone-900 rounded-sm shadow-2xl space-y-6">
      
      {/* ----------- COMPONENT HEAD ----------- */}
      <div className="border-b border-stone-950 pb-3 flex items-center justify-between">
        <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase flex items-center gap-2">
          <span className="w-1.5 h-4 bg-red-600 block rounded-sm"></span>
          Active Fleet Log
        </h3>
        <span className="font-mono text-[9px] tracking-wider text-stone-500 uppercase">
          Active Registry Nodes
        </span>
      </div>

      {/* ----------- DYNAMIC FLEET LIST CARDS ----------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {details
          .filter(detail => detail.hospitalId === hospitalId)
          .map(detail => {
            const isBusy = detail.status.toLowerCase() === 'busy';
            
            return (
              <div 
                key={detail._id} 
                className="bg-[#000000] border border-stone-900 p-4 rounded-sm flex flex-col justify-between space-y-4 relative group"
              >
                {/* Status Indicator Bar at the Left Edge */}
                <div className={`absolute top-0 left-0 w-[2px] h-full transition-colors duration-300 ${isBusy ? 'bg-red-600' : 'bg-emerald-500'}`}></div>
                
                {/* Metadata Content Block */}
                <div className="space-y-2 pl-2">
                  <div className="flex items-start gap-2.5">
                    <FontAwesomeIcon icon={faIdCard} className="text-stone-600 mt-1 text-sm" />
                    <div>
                      <span className="block font-mono text-[9px] tracking-widest text-stone-500 uppercase font-bold">Driver Name</span>
                      <p className="text-sm font-bold text-white tracking-tight uppercase">{detail.driverName}</p>
                    </div>
                  </div>

                  <div className="pl-6">
                    <span className="block font-mono text-[9px] tracking-widest text-stone-500 uppercase font-bold">Secure Contact</span>
                    <p className="text-xs font-mono text-stone-300 tracking-wide">{detail.contact}</p>
                  </div>
                </div>

                {/* Status Options Layout Block */}
                <div className="pt-3 border-t border-stone-950 flex items-center justify-between pl-2">
                  {editingId === detail._id ? (
                    <div className="flex items-center gap-2 w-full justify-between">
                      <select
                        value={statusValue}
                        onChange={(e) => setStatusValue(e.target.value)}
                        className={inputStyles}
                      >
                        <option value="available">Available</option>
                        <option value="busy">Busy</option>
                      </select>
                      
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleUpdate(detail._id)} className="w-7 h-7 bg-emerald-950/40 border border-emerald-900 text-emerald-400 hover:bg-emerald-900 hover:text-white rounded-sm flex items-center justify-center text-xs transition-all" title="Save Protocol">
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button onClick={() => setEditingId(null)} className="w-7 h-7 bg-stone-900 border border-stone-800 text-stone-400 hover:bg-stone-800 hover:text-white rounded-sm flex items-center justify-center text-xs transition-all" title="Cancel Action">
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Live Status Pill badge mapping */}
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm font-mono text-[10px] uppercase font-black ${
                        isBusy ? 'text-red-500 bg-red-950/20 border border-red-950' : 'text-emerald-500 bg-emerald-950/20 border border-emerald-950'
                      }`}>
                        <FontAwesomeIcon icon={faCircleDot} className={isBusy ? '' : 'animate-pulse'} />
                        {detail.status}
                      </div>

                      <button 
                        onClick={() => handleEdit(detail._id, detail.status)} 
                        className="px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-stone-400 hover:text-white border border-stone-900 hover:border-stone-700 rounded-sm flex items-center gap-1 transition-all"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} /> STATUS
                      </button>
                    </>
                  )}
                </div>

              </div>
            );
          })}
      </div>
      
    </div>
  );
};

export default DriverDetails;