import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faUser, faDroplet, faEnvelope, faPhone, faFileMedical, faCircleNodes, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { api } from '../api';
import { socket } from '../../socket'; // Imported your application socket pipeline instance
import { toast } from 'react-toastify';

const Requests = () => {
  const location = useLocation();
  const hospital = location.state?.hospitalData;

  const [reqData, setReqData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  // 1. Fetch historical pending/dispatched records from persistence layer
  const getRequest = async () => {
    try {
      const token = localStorage.getItem("hospital");
      const url = '/patient/request'; // Ensure your backend filters requests matching this hospital perimeter grid
      const res = await api.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReqData(res.data.response || []);
    } catch (err) {
      console.error("Failed to fetch incoming transmission requests:", err);
    }
  };

  useEffect(() => {
    if (hospital) {
      getRequest();

      // 🔥 REAL-TIME RECEIVER TETHER: Handshake with our server network
      socket.connect();
      socket.emit('join_hospital_room', hospital._id);

      // Listen for dynamic emergency alerts triggered near this location radius
      socket.on('incoming_broadcast_ping', (activeEmergency) => {
        console.log("Inbound socket packet captured on requests deck:", activeEmergency);
        
        // Prevent stacking duplicates if the screen auto-refreshed via layout shifts
        setReqData((prev) => {
          if (prev.some((r) => r._id === activeEmergency._id)) return prev;
          return [activeEmergency, ...prev]; // Appends the critical flash incident right to the top of the queue
        });

        toast.warning(`⚠️ Emergency incident detected inside operational perimeter.`);
      });

      // Clear layout buffers when another facility node completes the assignment block
      socket.on('clear_incident_card', ({ requestId }) => {
        setReqData((prev) => prev.filter((req) => req._id !== requestId));
      });
    }

    return () => {
      socket.off('incoming_broadcast_ping');
      socket.off('clear_incident_card');
      socket.disconnect();
    };
  }, [hospital]);

  // 🔥 CORE PROTOCOL LOGIC: Claiming an Active Incident
  const handleAccept = useCallback(async (requestId) => {
    try {
      const token = localStorage.getItem("hospital");
      
      // Patch update locks down target reference parameters to this specific hospital node
      const response = await api.patch(`/hospital/accept-emergency/${requestId}`, {
        hospitalId: hospital._id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        toast.success("Emergency context locked. Dispatch units deployed.");
        getRequest(); // Synchronize view state arrays
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 409) {
        toast.error("Race condition failure. Assignment already secured by another facility node.");
      } else {
        toast.error("Failed to process asset assignment parameters.");
      }
    }
  }, [hospital]);

  const handleIgnore = useCallback((requestId) => {
    // Silently remove from local visual layer array queue without altering global database parameters
    setReqData((prev) => prev.filter((req) => req._id !== requestId));
    toast.info("Incident removed from local monitor context console.");
  }, []);

  if (!hospital) {
    return (
      <div className="min-h-screen bg-[#000000] text-stone-400 flex items-center justify-center font-mono text-xs uppercase tracking-widest">
        Unauthorized access request. Invalid state context.
      </div>
    );
  }

  // Styles configuration tokens
  const cardStyles = "bg-[#111111] border border-stone-900 p-5 rounded-sm shadow-2xl transition-all duration-300 relative overflow-hidden group";
  const labelStyles = "block font-mono text-[9px] tracking-widest text-stone-600 uppercase font-black mb-0.5";
  const textRowStyles = "flex justify-between items-center py-1.5 border-b border-stone-950/60 font-mono text-xs text-stone-400";

  return (
    <div className="min-h-screen bg-[#000000] text-stone-200 antialiased pt-[12vh] pb-24 selection:bg-red-600 selection:text-white font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* ----------- CONSOLE LOG HEADER RUNNER ----------- */}
        <header className="border-b border-stone-900 pb-6 mb-10 text-center sm:text-left">
          <span className="inline-block font-mono text-xs text-red-500 font-bold uppercase tracking-wider mb-1">
            Live Dispatch Queue
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-display">
            {hospital.hospitalName}
          </h1>
          <p className="font-mono text-[10px] text-stone-500 uppercase tracking-wider mt-1">
            Active Patient Requests Link Layer
          </p>
        </header>

        {/* ----------- REQUESTS TIMELINE CONSOLE ----------- */}
        <div className="space-y-4">
          {reqData.length > 0 ? (
            reqData.map((request, index) => {
              const isOpen = openIndex === index;
              const isPending = request.status === 'pending';
              
              return (
                <div key={request._id} className={cardStyles}>
                  {/* Visual tracking indicator strip layout matching response status */}
                  <div className={`absolute top-0 left-0 w-[2px] h-full ${isPending ? 'bg-red-600 animate-pulse' : 'bg-emerald-500'}`}></div>

                  {/* HEADER AREA */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    
                    {/* Left: Patient Triage Meta Tags */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="w-10 h-10 bg-[#000000] border border-stone-950 flex items-center justify-center text-red-500 text-sm font-black font-mono rounded-sm flex-shrink-0">
                        {request.bloodGroup || "SOS"}
                      </div>
                      <div className="truncate">
                        <span className={labelStyles}>Primary Reporter Reference</span>
                        <h2 className="text-base font-bold text-white tracking-tight uppercase truncate font-display">
                          {request.user?.name || "Anonymous Emergency Patient"}
                        </h2>
                      </div>
                    </div>

                    {/* Right: Operational Controls */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t border-stone-950 pt-3 sm:pt-0 sm:border-0">
                      <div className="flex items-center gap-2">
                        {isPending ? (
                          <>
                            <button 
                              onClick={() => handleAccept(request._id)}
                              className="px-4 py-1.5 font-mono text-[10px] font-black tracking-widest text-black bg-[#00ffaa] hover:bg-[#00e599] rounded-sm shadow-md transition-all uppercase flex items-center gap-1.5"
                            >
                              <FontAwesomeIcon icon={faCheck} /> Accept
                            </button>
                            <button 
                              onClick={() => handleIgnore(request._id)}
                              className="px-4 py-1.5 font-mono text-[10px] font-bold tracking-widest text-stone-500 bg-transparent border border-stone-800 hover:text-white hover:border-stone-600 rounded-sm transition-all uppercase flex items-center gap-1.5"
                            >
                              <FontAwesomeIcon icon={faXmark} /> Ignore
                            </button>
                          </>
                        ) : (
                          <span className="px-3 py-1 font-mono text-[9px] font-bold tracking-widest text-emerald-400 bg-emerald-950/20 border border-emerald-900/40 rounded-sm uppercase">
                            Secured By You
                          </span>
                        )}
                      </div>
                      
                      <button 
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="w-8 h-8 rounded-sm bg-[#000000] border border-stone-950 text-stone-500 hover:text-white flex items-center justify-center transition-all"
                      >
                        <FontAwesomeIcon 
                          icon={faChevronDown} 
                          className={`text-xs transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-500' : 'rotate-0'}`} 
                        />
                      </button>
                    </div>

                  </div>

                  {/* DROPDOWN AREA */}
                  <div className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 pt-5 mt-4 border-t border-stone-950' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                  }`}>
                    <div className="overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      
                      {/* Left: Communication Logistics */}
                      <div className="md:col-span-5 bg-[#000000] border border-stone-950 p-4 rounded-sm space-y-1">
                        <span className="block font-sans text-[8px] text-stone-600 uppercase font-black tracking-widest border-b border-stone-900 pb-1 mb-2">
                          Incident Telemetry Parameters
                        </span>
                        <div className={textRowStyles}>
                          <span className="flex items-center gap-1.5 text-stone-600"><FontAwesomeIcon icon={faUser} /> Identity Mode</span>
                          <span className="text-stone-300 uppercase font-bold">{request.user?.role || "GUEST"}</span>
                        </div>
                        <div className={textRowStyles}>
                          <span className="flex items-center gap-1.5 text-stone-600"><FontAwesomeIcon icon={faPhone} /> Terminal Link</span>
                          <span className="text-stone-300 tracking-wide">{request.contactPhone || "None via silent channel"}</span>
                        </div>
                        <div className={textRowStyles}>
                          <span className="flex items-center gap-1.5 text-stone-600"><FontAwesomeIcon icon={faEnvelope} /> Node Latency</span>
                          <span className="text-stone-300 truncate max-w-[180px] font-mono">{request.location?.type || "Standard GPS"}</span>
                        </div>
                        <div className={textRowStyles}>
                          <span className="flex items-center gap-1.5 text-stone-600"><FontAwesomeIcon icon={faCircleNodes} /> Position Coordinates</span>
                          <span className="text-red-500 font-bold">
                            {request.location?.coordinates[1].toFixed(4)}° N, {request.location?.coordinates[0].toFixed(4)}° E
                          </span>
                        </div>
                      </div>

                      {/* Right: Clinical Diagnostic Triage */}
                      <div className="md:col-span-7 bg-[#000000] border border-stone-950 p-4 rounded-sm space-y-2 h-full">
                        <span className="block font-sans text-[8px] text-stone-600 uppercase font-black tracking-widest border-b border-stone-900 pb-1 flex items-center gap-1">
                          <FontAwesomeIcon icon={faFileMedical} className="text-stone-700" /> Operational System Notes
                        </span>
                        <p className="text-xs text-stone-400 leading-relaxed font-sans p-1 rounded-sm text-justify">
                          {request.notes || "No custom medical metrics appended. Silent structural distress dispatch triggered instantly from terminal console."}
                        </p>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })
          ) : (
            /* EMPTY QUEUE DIAGNOSTIC */
            <div className="min-h-[40vh] flex flex-col items-center justify-center text-center space-y-4 bg-[#111111] border border-stone-900 rounded-sm p-12">
              <FontAwesomeIcon icon={faCircleNodes} className="text-stone-800 text-4xl" />
              <div className="space-y-1">
                <h3 className="text-sm font-bold uppercase tracking-tight text-white">Queue Empty</h3>
                <p className="font-mono text-xs text-stone-600 max-w-xs">
                  No incoming patient dispatches currently routed to this terminal node.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Requests;