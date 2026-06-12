import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import { api } from './../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCheck, faXmark, faFolderOpen, faHospital, faUserShield } from '@fortawesome/free-solid-svg-icons';

// Memoized shared style tokens to avoid recreating objects on every single render pass
const STYLES = {
  label: "block font-mono text-[9px] tracking-widest text-stone-600 uppercase font-black mb-1",
  data: "text-xs font-mono text-stone-300 truncate",
  infoSection: "bg-[#050505] border border-stone-950 p-4 rounded-sm space-y-1.5",
  sectionTitle: "text-[10px] font-sans font-black tracking-widest text-white uppercase border-b border-stone-900 pb-1 mb-2.5 flex items-center gap-1.5"
};

// Sub-component pulled out of the parent cycle to prevent continuous redeclaration behavior
const HospitalRow = React.memo(({ item, index, sectionType, isOpen, onToggle, onApprove, onReject }) => {
  const uniqueKey = `${sectionType}-${index}`;

  return (
    <div className="bg-[#111111] border border-stone-900 rounded-sm shadow-xl overflow-hidden">
      
      {/* ROW ACTION BAR HERO ELEMENTS */}
      <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
        <div className={`absolute top-0 left-0 w-[2px] h-full ${sectionType === 'Pending' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
        
        <div className="pl-2 space-y-0.5">
          <span className="block font-mono text-[9px] tracking-widest text-stone-500 uppercase font-bold">
            Node Identifier: {item._id.substring(0, 8)}...
          </span>
          <h3 className="text-sm font-display font-black text-white uppercase tracking-tight flex flex-wrap items-center gap-2">
            <span className="text-stone-400 font-mono">[{item.registrationNo}]</span> {item.hospitalName}
          </h3>
        </div>

        {/* Core Configuration Action Triggers */}
        <div className="flex items-center justify-between md:justify-end gap-3 border-t border-stone-950 pt-3 md:pt-0 md:border-0">
          {sectionType === 'Pending' && (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onApprove(item._id)} 
                className="px-3 py-1.5 font-mono text-[10px] font-black tracking-widest text-white bg-emerald-700 hover:bg-emerald-600 rounded-sm flex items-center gap-1 uppercase transition-all active:scale-95"
              >
                <FontAwesomeIcon icon={faCheck} /> Approve
              </button>
              <button 
                onClick={() => onReject(item._id)} 
                className="px-3 py-1.5 font-mono text-[10px] font-black tracking-widest text-white bg-red-700 hover:bg-red-600 rounded-sm flex items-center gap-1 uppercase transition-all active:scale-95"
              >
                <FontAwesomeIcon icon={faXmark} /> Reject
              </button>
            </div>
          )}
          
          <button 
            onClick={() => onToggle(uniqueKey)}
            className="w-8 h-8 rounded-sm bg-[#000000] border border-stone-950 text-stone-500 hover:text-white flex items-center justify-center transition-all"
          >
            <FontAwesomeIcon icon={faChevronDown} className={`text-xs transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-500' : 'rotate-0'}`} />
          </button>
        </div>
      </div>

      {/* EXPANDABLE METADATA MATRIX SHEETS (Fixed CSS transition wrapper logic) */}
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] border-t border-stone-950' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="p-4 bg-[#0a0a0a] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
            
            {/* Box 1: Core Institutional Profile */}
            <div className={STYLES.infoSection}>
              <h4 className={STYLES.sectionTitle}><FontAwesomeIcon icon={faHospital} className="text-stone-700" /> Facility Profile</h4>
              <div><span className={STYLES.label}>Name</span><p className={STYLES.data}>{item.hospitalName}</p></div>
              <div><span className={STYLES.label}>Registration Code</span><p className={STYLES.data}>{item.registrationNo}</p></div>
              <div><span className={STYLES.label}>Operating Model</span><p className={STYLES.data}>{item.hospitalType} / {item.ownership}</p></div>
              <div><span className={STYLES.label}>Established Year</span><p className={STYLES.data}>{item.establishedYear}</p></div>
            </div>

            {/* Box 2: Administrative Keys */}
            <div className={STYLES.infoSection}>
              <h4 className={STYLES.sectionTitle}><FontAwesomeIcon icon={faUserShield} className="text-stone-700" /> Node Authority</h4>
              <div><span className={STYLES.label}>Supervisor Name</span><p className={STYLES.data}>{item.adminName}</p></div>
              <div><span className={STYLES.label}>Designated Role</span><p className={STYLES.data}>{item.adminRole}</p></div>
              <div><span className={STYLES.label}>Secure Mobile Link</span><p className={STYLES.data}>{item.adminPhone}</p></div>
              <div><span className={STYLES.label}>Secure Access Email</span><p className={STYLES.data}>{item.adminEmail}</p></div>
            </div>

            {/* Box 3: Network Operations Suite */}
            <div className={STYLES.infoSection}>
              <h4 className={STYLES.sectionTitle}><FontAwesomeIcon icon={faFolderOpen} className="text-stone-700" /> Communications Suite</h4>
              <div><span className={STYLES.label}>Emergency Hotline</span><p className={`${STYLES.data} text-red-500 font-bold`}>{item.emergencyPhone}</p></div>
              <div><span className={STYLES.label}>Office Lines</span><p className={STYLES.data}>{item.officialPhone}</p></div>
              <div><span className={STYLES.label}>Official Email</span><p className={STYLES.data}>{item.officialEmail}</p></div>
              <div><span className={STYLES.label}>Web Domain</span><a href={item.website} target="_blank" rel="noreferrer" className="text-red-400 hover:underline text-xs truncate block font-sans">{item.website}</a></div>
            </div>

            {/* Box 4: Static Capacity Logistics */}
            <div className={STYLES.infoSection}>
              <h4 className={STYLES.sectionTitle}>Resource Architecture</h4>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-stone-400">
                <div><span>Gross Beds:</span> <span className="text-white">{item.totalBeds}</span></div>
                <div><span>ICU Units:</span> <span className="text-white">{item.icuBeds}</span></div>
                <div><span>Oxygen Lines:</span> <span className="text-white">{item.oxygenBeds}</span></div>
                <div><span>Ventilators:</span> <span className="text-white">{item.ventilators}</span></div>
                <div><span>Fleet Count:</span> <span className="text-white">{item.ambulanceCount}</span></div>
                <div><span>24x7 Protocol:</span> <span className="text-white">{item.is24X7}</span></div>
              </div>
              <div className="pt-2 border-t border-stone-950 mt-2"><span className={STYLES.label}>Departments</span><p className="text-xs font-sans text-stone-400 line-clamp-1">{item.departments}</p></div>
            </div>

            {/* Box 5: Live Streaming Feeds */}
            <div className={STYLES.infoSection}>
              <h4 className={STYLES.sectionTitle}>Live Grid Telemetry</h4>
              <div><span className={STYLES.label}>Crisis Intake Permission</span><p className="text-xs font-sans font-bold text-white">{item.isAcceptingEmergency ? "ACTIVE ACCESS OPEN" : "DIVERTED SCHEDULE"}</p></div>
              <div><span className={STYLES.label}>Unoccupied Beds</span><p className="text-xs font-sans font-bold text-emerald-500">{item.availableBeds} Vacant</p></div>
              <div><span className={STYLES.label}>Ready Dispatches</span><p className="text-xs font-sans font-bold text-red-500">{item.availableAmbulances} Units Available</p></div>
            </div>

            {/* Box 6: Verification Cloud Assets */}
            <div className={STYLES.infoSection}>
              <h4 className={STYLES.sectionTitle}>Verification Record Vault</h4>
              <div className="space-y-1 font-mono text-[11px] text-stone-400 flex flex-col justify-center h-full">
                <div className="flex justify-between border-b border-stone-950 pb-1"><span>Operational License:</span> <a href={item.hospitalLicenseUrl} target="_blank" rel="noreferrer" className="text-red-400 hover:underline">VIEW DOC</a></div>
                <div className="flex justify-between border-b border-stone-950 pb-1"><span>Identity Record Link:</span> <a href={item.aadhaarOrPanUrl} target="_blank" rel="noreferrer" className="text-red-400 hover:underline">VIEW DOC</a></div>
                <div className="flex justify-between border-b border-stone-950 pb-1"><span>Fire Clearance Cert:</span> <a href={item.fireSafetyCertificate} target="_blank" rel="noreferrer" className="text-red-400 hover:underline">VIEW DOC</a></div>
                <div className="flex justify-between pt-1"><span>Structural Asset:</span> <a href={item.imageOfHospital} target="_blank" rel="noreferrer" className="text-red-400 hover:underline">VIEW IMAGE</a></div>
              </div>
            </div>

            {/* Box 7: Geographic Coordinates Map */}
            <div className={`${STYLES.infoSection} sm:col-span-2 lg:col-span-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`}>
              <div className="text-xs text-stone-400">
                <span className={STYLES.label}>Physical Geographic Registry Address</span>
                <p className="text-white font-sans font-bold">{item.addressLine1} {item.addressLine2}, {item.city} ({item.pincode})</p>
                <p className="text-[11px] font-sans text-stone-500 mt-0.5">{item.district}, {item.state}</p>
              </div>
              <div className="font-mono text-[11px] text-stone-500 flex flex-col items-end flex-shrink-0">
                <div><span>LAT:</span> <span className="text-stone-300 font-bold">{item.latitude}</span></div>
                <div><span>LONG:</span> <span className="text-stone-300 font-bold">{item.longitude}</span></div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
});

HospitalRow.displayName = "HospitalRow";

const Admin = () => {
  const [data, setData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  const getData = async () => {
    try {
      const token = localStorage.getItem("admin");
      const res = await api.get('/hospital/list', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Storing just the array direct references to prevent deep layout data lookups
      setData(res.data?.response || []);
    } catch (err) {
      console.error("System sync interrupted:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // useMemoizes array divisions so filtering computations execute ONLY when the base raw 'data' array updates.
  const { pendingHospitals, approvedHospitals } = useMemo(() => {
    const pending = [];
    const approved = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].verificationStatus === "Pending") pending.push(data[i]);
      else if (data[i].verificationStatus === "Approved") approved.push(data[i]);
    }
    return { pendingHospitals: pending, approvedHospitals: approved };
  }, [data]);

  // useCallback prevents re-instantiating state functions on child elements during dynamic view cycles
  const handleApprove = useCallback(async (id) => {
    try {
      const token = localStorage.getItem("admin");
      await api.patch(`/admin/approve/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Hospital Approved");
      getData();
    } catch (err) {
      console.error(err);
      toast.error("Approval action protocol failed.");
    }
  }, []);

  const handleReject = useCallback(async (id) => {
    try {
      const token = localStorage.getItem("admin");
      await api.patch(`/admin/reject/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Hospital Rejected");
      getData();
    } catch (err) {
      console.error(err);
      toast.error("Rejection action protocol failed.");
    }
  }, []);

  const toggleDropdown = useCallback((uniqueKey) => {
    setOpenIndex(prev => (prev === uniqueKey ? null : uniqueKey));
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-stone-200 antialiased pt-[14vh] pb-24 selection:bg-red-600 selection:text-white font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-12">
        
        {/* ----------- DASHBOARD CORE SUBHEAD ----------- */}
        <header className="border-b border-stone-900 pb-4">
          <h1 className="text-xl font-black text-white uppercase tracking-tight font-display">
            Central Node Registry Management
          </h1>
        </header>

        {/* ----------- PENDING LIST CONSOLE PANEL ----------- */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-md font-bold tracking-tight text-white uppercase font-display">
              Pending Evaluation Queue
            </h2>
            <span className="flex items-center justify-center w-5 h-5 bg-amber-500/20 border border-amber-500 font-mono text-[11px] font-black text-amber-500 rounded-full animate-pulse">
              {pendingHospitals.length}
            </span>
          </div>
          
          <div className="space-y-4">
            {pendingHospitals.length > 0 ? (
              pendingHospitals.map((item, index) => (
                <HospitalRow 
                  key={item._id}
                  item={item}
                  index={index}
                  sectionType="Pending"
                  isOpen={openIndex === `Pending-${index}`}
                  onToggle={toggleDropdown}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))
            ) : (
              <p className="text-xs font-mono text-stone-600 bg-[#111111] p-4 rounded-sm border border-stone-900">
                No active network requests currently awaiting evaluation protocols.
              </p>
            )}
          </div>
        </section>

        {/* ----------- APPROVED LIST CONSOLE PANEL ----------- */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-md font-bold tracking-tight text-white uppercase font-display">
              Authorized Operational Nodes
            </h2>
            <span className="flex items-center justify-center w-5 h-5 bg-emerald-500/20 border border-emerald-500 font-mono text-[11px] font-black text-emerald-500 rounded-full">
              {approvedHospitals.length}
            </span>
          </div>

          <div className="space-y-4">
            {approvedHospitals.length > 0 ? (
              approvedHospitals.map((item, index) => (
                <HospitalRow 
                  key={item._id}
                  item={item}
                  index={index}
                  sectionType="Approved"
                  isOpen={openIndex === `Approved-${index}`}
                  onToggle={toggleDropdown}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))
            ) : (
              <p className="text-xs font-mono text-stone-600 bg-[#111111] p-4 rounded-sm border border-stone-900">
                No network entries currently evaluated as authorized nodes.
              </p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Admin;