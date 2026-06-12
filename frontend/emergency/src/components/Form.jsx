import React, { useState } from "react";
import { api } from "../api";

const Form = () => {
  const [formData, setFormData] = useState({
    relationshipToPatient: "",
    registrationNo: "",
    bloodGroup: "",
    notes: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    hospitalId: "",
    location: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.post("/patient/request", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Emergency dispatch request broadcasted successfully!");
      setFormData({
        relationshipToPatient: "",
        registrationNo: "",
        bloodGroup: "",
        notes: "",
        contactName: "",
        contactPhone: "",
        contactEmail: "",
        hospitalId: "",
        location: "",
        address: "",
      });
    } catch (err) {
      console.error(err);
      alert("Transmission protocol failed. Check system authorization.");
    }
  };

  // Uniform layout system properties
  const sectionCardStyles = "bg-[#111111] p-6 sm:p-8 rounded-sm border border-stone-900 shadow-2xl space-y-6";
  const labelStyles = "block font-mono text-xs tracking-wider text-stone-400 uppercase font-bold mb-1.5";
  const inputStyles = "w-full bg-[#000000] border border-stone-800 focus:border-red-600 rounded-sm p-3 text-sm text-stone-200 placeholder-stone-700 outline-none transition-all duration-200 focus:ring-1 focus:ring-red-600";
  const titleStyles = "text-md font-bold tracking-tight text-white uppercase border-b border-stone-950 pb-3 flex items-center gap-2 font-sans";

  return (
    <div className="min-h-screen bg-[#000000] text-stone-200 antialiased pt-[12vh] pb-24 selection:bg-red-600 selection:text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ----------- INCIDENT HEADER PROTOCOL ----------- */}
        <header className="text-center space-y-2 mb-12">
          <span className="inline-block font-mono text-xs tracking-widest text-red-500 font-bold uppercase border border-red-950 bg-red-950/20 px-3 py-1 rounded-sm animate-pulse">
            CRITICAL DISPATCH INTAKE
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            Emergency Service Request
          </h1>
          <p className="text-sm font-mono text-stone-500 max-w-md mx-auto">
            Input verified patient status parameters to patch a request immediately through to target facility grids.
          </p>
        </header>

        {/* ----------- INTERACTIVE SYSTEM INPUTS ----------- */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* CATEGORY 1: HOSPITAL ANCHOR IDENTIFIERS */}
          <div className={sectionCardStyles}>
            <h2 className={titleStyles}>
              <span className="w-1.5 h-4 bg-red-600 block rounded-sm"></span>
              Target Facility Verification
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="hospitalId" className={labelStyles}>
                  Hospital Identifier Code <span className="text-red-500">*</span>
                </label>
                <input type="text" name="hospitalId" id="hospitalId" placeholder="Paste target system node ID string" value={formData.hospitalId} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="registrationNo" className={labelStyles}>
                  Patient Admission/Reg No <span className="text-red-500">*</span>
                </label>
                <input type="text" name="registrationNo" id="registrationNo" placeholder="Enter registration identifier" value={formData.registrationNo} onChange={handleChange} className={inputStyles} required />
              </div>
            </div>
          </div>

          {/* CATEGORY 2: MEDICAL METRICS */}
          <div className={sectionCardStyles}>
            <h2 className={titleStyles}>
              <span className="w-1.5 h-4 bg-red-600 block rounded-sm"></span>
              Patient Condition Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="relationshipToPatient" className={labelStyles}>
                  Your Relation to Patient <span className="text-red-500">*</span>
                </label>
                <input type="text" name="relationshipToPatient" id="relationshipToPatient" placeholder="e.g. Spouse, Parent, Bystander" value={formData.relationshipToPatient} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="bloodGroup" className={labelStyles}>
                  Verified Blood Group <span className="text-red-500">*</span>
                </label>
                <input type="text" name="bloodGroup" id="bloodGroup" placeholder="e.g. O-, AB+, A+" value={formData.bloodGroup} onChange={handleChange} className={inputStyles} required />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="notes" className={labelStyles}>
                  Triage / Diagnostic Notes <span className="text-red-500">*</span>
                </label>
                <textarea name="notes" id="notes" placeholder="Specify present conditions, injuries, conscious status, or vital details clearly..." value={formData.notes} onChange={handleChange} className={`${inputStyles} min-h-[110px] resize-none`} required></textarea>
              </div>
            </div>
          </div>

          {/* CATEGORY 3: RECEPTIONIST COMMS SUITE */}
          <div className={sectionCardStyles}>
            <h2 className={titleStyles}>
              <span className="w-1.5 h-4 bg-red-600 block rounded-sm"></span>
              Contact & Geolocation Protocols
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label htmlFor="contactName" className={labelStyles}>
                  Primary Reporter Name <span className="text-red-500">*</span>
                </label>
                <input type="text" name="contactName" id="contactName" placeholder="Enter full communication name" value={formData.contactName} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="location" className={labelStyles}>
                  Coordinates (Lat/Long) <span className="text-red-500">*</span>
                </label>
                <input type="text" name="location" id="location" placeholder="e.g. 28.984, 77.706" value={formData.location} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="address" className={labelStyles}>
                  Physical Landmark Address <span className="text-red-500">*</span>
                </label>
                <input type="text" name="address" id="address" placeholder="e.g. Sector 4, Near Metro Pillar 12" value={formData.address} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="contactPhone" className={labelStyles}>
                  Active Callback Number <span className="text-red-500">*</span>
                </label>
                <input type="tel" name="contactPhone" id="contactPhone" placeholder="e.g. +91 98765 XXXXX" value={formData.contactPhone} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="contactEmail" className={labelStyles}>
                  Secure Updates Email <span className="text-red-500">*</span>
                </label>
                <input type="email" name="contactEmail" id="contactEmail" placeholder="reporter@network.com" value={formData.contactEmail} onChange={handleChange} className={inputStyles} required />
              </div>
            </div>
          </div>

          {/* ----------- SYSTEM BROADCAST COMMIT COMMAND ----------- */}
          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto px-12 py-4 font-mono font-black text-xs tracking-widest uppercase text-white bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 rounded-sm shadow-xl shadow-red-950/40 transform active:scale-[0.99] transition-all duration-200"
            >
              Broadcast Emergency Request
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Form;