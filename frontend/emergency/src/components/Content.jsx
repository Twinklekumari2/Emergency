import React, { useState } from "react";
import { api } from './../api';
import { toast } from 'react-toastify'; // Swapped basic alerts for system level toast indicators

const Content = () => {
  const [formData, setFormData] = useState({
    hospitalName: "",
    registrationNo: "",
    hospitalType: "",
    ownership: "",
    establishedYear: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    pincode: "",
    state: "",
    latitude: "",
    longitude: "",
    officialEmail: "",
    officialPhone: "",
    emergencyPhone: "",
    website: "",
    totalBeds: "",
    icuBeds: "",
    oxygenBeds: "",
    ventilators: "",
    ambulanceCount: "",
    is24X7: "",
    departments: "",
    isAcceptingEmergency: "",
    availableBeds: "",
    availableAmbulances: "",
    lastUpdated: "",
    hospitalLicenseUrl: "",
    aadhaarOrPanUrl: "",
    fireSafetyCertificate: "",
    imageOfHospital: "",
    adminName: "",
    adminRole: "",
    adminPhone: "",
    adminEmail: "",
    adminPassword: "",
    verificationStatus: "Pending",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert raw text coordinates to standard coordinate floats
      const lat = parseFloat(formData.latitude);
      const lng = parseFloat(formData.longitude);

      if (isNaN(lat) || isNaN(lng)) {
        toast.error("Invalid geographic parameters. Check coordinates syntax.");
        return;
      }

      // 🔥 THE LIFESAVING TRANSFORMATION: Re-mapping data to feed the 2dsphere engine!
      const operationalPayload = {
        ...formData,
        location: {
          type: "Point",
          coordinates: [lng, lat] // Crucial rule: Longitude first, latitude second!
        }
      };

      toast.info("Registering facility with national disaster management grid...", { autoClose: 2000 });

      const res = await api.post("/hospital/hospitals", operationalPayload);
      toast.success("Registration request submitted successfully!");
      
      // Reset grid parameters to fresh blank fields
      setFormData({
        hospitalName: "", registrationNo: "", hospitalType: "", ownership: "", establishedYear: "",
        addressLine1: "", addressLine2: "", city: "", district: "", pincode: "", state: "",
        latitude: "", longitude: "", officialEmail: "", officialPhone: "", emergencyPhone: "", website: "",
        totalBeds: "", icuBeds: "", oxygenBeds: "", ventilators: "", ambulanceCount: "", is24X7: "", departments: "",
        isAcceptingEmergency: "", availableBeds: "", availableAmbulances: "", lastUpdated: "",
        hospitalLicenseUrl: "", aadhaarOrPanUrl: "", fireSafetyCertificate: "", imageOfHospital: "",
        adminName: "", adminRole: "", adminPhone: "", adminEmail: "", adminPassword: "", verificationStatus: "Pending",
      });

      const token = res.data.token;
      if (token) localStorage.setItem("token", token);
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Please check network protocols.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Reusable styling parameters
  const inputStyles = "w-full bg-[#000000] border border-stone-800 focus:border-red-600 rounded-sm p-3 text-sm text-stone-200 placeholder-stone-700 outline-none transition-all duration-200 focus:ring-1 focus:ring-red-600 font-sans";
  const labelStyles = "block font-mono text-xs tracking-wider text-stone-400 uppercase font-bold mb-1.5";
  const sectionCardStyles = "bg-[#111111] p-6 sm:p-8 rounded-sm border border-stone-900 shadow-2xl space-y-6";
  const titleStyles = "text-lg font-bold tracking-tight text-white uppercase border-b border-stone-900 pb-3 flex items-center gap-2 font-display";

  return (
    <div className="min-h-screen bg-[#000000] text-stone-200 antialiased pt-[12vh] pb-24 selection:bg-red-600 selection:text-white font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ----------- PAGE HEADER ----------- */}
        <header className="text-center space-y-2 mb-12">
          <span className="inline-block font-mono text-xs tracking-widest text-red-500 font-bold uppercase border border-red-950 bg-red-950/20 px-3 py-1 rounded-sm">
            Node Registry
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-display">
            Hospital Onboarding Section
          </h1>
          <p className="text-sm font-mono text-stone-500 max-w-md mx-auto">
            "Authorize and register your medical facility to link into the real-time grid response architecture."
          </p>
        </header>

        {/* ----------- REGISTRATION FORM FLOW ----------- */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION 1: BASIC METRICS */}
          <div className={sectionCardStyles}>
            <h2 className={titleStyles}>
              <span className="w-1.5 h-4 bg-red-600 block rounded-sm"></span>
              Hospital Basic Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="hospitalName" className={labelStyles}>Hospital Name</label>
                <input type="text" id="hospitalName" name="hospitalName" placeholder="e.g. City Heart Hospital" value={formData.hospitalName} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="registrationNo" className={labelStyles}>Registration Number</label>
                <input type="text" id="registrationNo" name="registrationNo" placeholder="e.g. REG-982374" value={formData.registrationNo} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="hospitalType" className={labelStyles}>Hospital Type</label>
                <input type="text" id="hospitalType" name="hospitalType" placeholder="e.g Govt / Private / Clinic" value={formData.hospitalType} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="ownership" className={labelStyles}>Ownership</label>
                <input type="text" id="ownership" name="ownership" placeholder="e.g Individual / Trust / Govt" value={formData.ownership} onChange={handleChange} className={inputStyles} required />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="establishedYear" className={labelStyles}>Established Year</label>
                <input type="number" id="establishedYear" name="establishedYear" placeholder="e.g. 1986" value={formData.establishedYear} onChange={handleChange} className={inputStyles} required />
              </div>
            </div>
          </div>

          {/* SECTION 2: PHYSICAL ADDRESS PROTOCOLS */}
          <div className={sectionCardStyles}>
            <h2 className={titleStyles}>
              <span className="w-1.5 h-4 bg-red-600 block rounded-sm"></span>
              Address & Location Geocoding
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="addressLine1" className={labelStyles}>Address Line 1</label>
                <input type="text" id="addressLine1" name="addressLine1" placeholder="e.g Saraswati Vihar" value={formData.addressLine1} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="addressLine2" className={labelStyles}>Address Line 2</label>
                <input type="text" id="addressLine2" name="addressLine2" placeholder="e.g Rohta Road" value={formData.addressLine2} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="city" className={labelStyles}>City</label>
                <input type="text" id="city" name="city" placeholder="e.g Meerut" value={formData.city} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="district" className={labelStyles}>District</label>
                <input type="text" id="district" name="district" placeholder="e.g Meerut" value={formData.district} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="state" className={labelStyles}>State</label>
                <input type="text" id="state" name="state" placeholder="e.g Uttar Pradesh" value={formData.state} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="pincode" className={labelStyles}>Pincode</label>
                <input type="number" id="pincode" name="pincode" placeholder="e.g 250001" value={formData.pincode} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="latitude" className={labelStyles}>Latitude Geolocation</label>
                <input type="text" id="latitude" name="latitude" placeholder="e.g 28.984" value={formData.latitude} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="longitude" className={labelStyles}>Longitude Geolocation</label>
                <input type="text" id="longitude" name="longitude" placeholder="e.g 77.706" value={formData.longitude} onChange={handleChange} className={inputStyles} required />
              </div>
            </div>
          </div>

          {/* SECTION 3: LINE CONTACTS */}
          <div className={sectionCardStyles}>
            <h2 className={titleStyles}>
              <span className="w-1.5 h-4 bg-red-600 block rounded-sm"></span>
              Communications Suite
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="officialEmail" className={labelStyles}>Official Email Address</label>
                <input type="email" id="officialEmail" name="officialEmail" placeholder="e.g hospital@example.com" value={formData.officialEmail} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="officialPhone" className={labelStyles}>Official Phone Number</label>
                <input type="tel" id="officialPhone" name="officialPhone" placeholder="e.g 0123-987654" value={formData.officialPhone} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="emergencyPhone" className={labelStyles}>Emergency Hotline</label>
                <input type="tel" id="emergencyPhone" name="emergencyPhone" placeholder="e.g +91 98765 43210" value={formData.emergencyPhone} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="website" className={labelStyles}>Web Portal URL</label>
                <input type="url" id="website" name="website" placeholder="https://" value={formData.website} onChange={handleChange} className={inputStyles} required />
              </div>
            </div>
          </div>

          {/* SECTION 4: RESOURCE BLOCK CAPACITY */}
          <div className={sectionCardStyles}>
            <h2 className={titleStyles}>
              <span className="w-1.5 h-4 bg-red-600 block rounded-sm"></span>
              Infrastructure Capacity
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <label htmlFor="totalBeds" className={labelStyles}>Total Beds</label>
                <input type="number" id="totalBeds" name="totalBeds" placeholder="0" value={formData.totalBeds} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="icuBeds" className={labelStyles}>ICU Beds</label>
                <input type="number" id="icuBeds" name="icuBeds" placeholder="0" value={formData.icuBeds} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="oxygenBeds" className={labelStyles}>Oxygen Beds</label>
                <input type="number" id="oxygenBeds" name="oxygenBeds" placeholder="0" value={formData.oxygenBeds} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="ventilators" className={labelStyles}>Ventilators</label>
                <input type="number" id="ventilators" name="ventilators" placeholder="0" value={formData.ventilators} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="ambulanceCount" className={labelStyles}>Fleet Ambulance Count</label>
                <input type="number" id="ambulanceCount" name="ambulanceCount" placeholder="0" value={formData.ambulanceCount} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="is24X7" className={labelStyles}>24x7 Status</label>
                <select id="is24X7" name="is24X7" value={formData.is24X7} onChange={handleChange} className={inputStyles}>
                  <option value="">Select Protocol</option>
                  <option value="Yes">Operational 24x7</option>
                  <option value="No">Restricted Schedule</option>
                </select>
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <label htmlFor="departments" className={labelStyles}>Active Specialized Departments</label>
                <input type="text" id="departments" name="departments" placeholder="e.g. Cardiology, Neurology, Emergency Care" value={formData.departments} onChange={handleChange} className={inputStyles} required />
              </div>
            </div>
          </div>

          {/* SECTION 5: LEGAL RECORDS */}
          <div className={sectionCardStyles}>
            <h2 className={titleStyles}>
              <span className="w-1.5 h-4 bg-red-600 block rounded-sm"></span>
              Verification Document Repositories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="hospitalLicenseUrl" className={labelStyles}>Hospital License URL</label>
                <input type="url" id="hospitalLicenseUrl" name="hospitalLicenseUrl" placeholder="https://license-vault-link" value={formData.hospitalLicenseUrl} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="aadhaarOrPanUrl" className={labelStyles}>Verification Record URL (Aadhaar/PAN)</label>
                <input type="url" id="aadhaarOrPanUrl" name="aadhaarOrPanUrl" placeholder="https://verification-vault-link" value={formData.aadhaarOrPanUrl} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="fireSafetyCertificate" className={labelStyles}>Fire Safety Clearance URL</label>
                <input type="url" id="fireSafetyCertificate" name="fireSafetyCertificate" placeholder="https://clearance-vault-link" value={formData.fireSafetyCertificate} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="imageOfHospital" className={labelStyles}>Structural Image Asset URL</label>
                <input type="url" id="imageOfHospital" name="imageOfHospital" placeholder="https://image-cloud-link" value={formData.imageOfHospital} onChange={handleChange} className={inputStyles} required />
              </div>
            </div>
          </div>

          {/* SECTION 6: STREAM METRICS */}
          <div className={sectionCardStyles}>
            <h2 className={titleStyles}>
              <span className="w-1.5 h-4 bg-red-600 block rounded-sm"></span>
              Live Resource Dispatches
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="isAcceptingEmergency" className={labelStyles}>Accepting Crisis Dispatches?</label>
                <select id="isAcceptingEmergency" name="isAcceptingEmergency" value={formData.isAcceptingEmergency} onChange={handleChange} className={inputStyles}>
                  <option value="">Select Status</option>
                  <option value="true">Active Intake Open</option>
                  <option value="false">Intake Temporarily Diverted</option>
                </select>
              </div>
              <div>
                <label htmlFor="availableBeds" className={labelStyles}>Currently Unoccupied Beds</label>
                <input type="number" id="availableBeds" name="availableBeds" placeholder="Available Now" value={formData.availableBeds} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="availableAmbulances" className={labelStyles}>Ready Dispatch Ambulances</label>
                <input type="number" id="availableAmbulances" name="availableAmbulances" placeholder="Available Now" value={formData.availableAmbulances} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="lastUpdated" className={labelStyles}>System Timestamp Check</label>
                <input type="datetime-local" id="lastUpdated" name="lastUpdated" value={formData.lastUpdated} onChange={handleChange} className={`${inputStyles} text-stone-500`} required />
              </div>
            </div>
          </div>

          {/* SECTION 7: ADMIN STAFF CREDENTIALS */}
          <div className={sectionCardStyles}>
            <h2 className={titleStyles}>
              <span className="w-1.5 h-4 bg-red-600 block rounded-sm"></span>
              Administrative Security Authority
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="adminName" className={labelStyles}>Chief Administrator Name</label>
                <input type="text" id="adminName" name="adminName" placeholder="e.g Dr. Rakesh Sharma" value={formData.adminName} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="adminRole" className={labelStyles}>Authorized Staff Role</label>
                <input type="text" id="adminRole" name="adminRole" placeholder="e.g. Chief Medical Superintendent" value={formData.adminRole} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="adminPhone" className={labelStyles}>Secure Mobile Link</label>
                <input type="tel" id="adminPhone" name="adminPhone" placeholder="+91 XXXXX XXXXX" value={formData.adminPhone} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="adminEmail" className={labelStyles}>Secure Login Email</label>
                <input type="email" id="adminEmail" name="adminEmail" placeholder="admin@node.emergencynet" value={formData.adminEmail} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="adminPassword" className={labelStyles}>Access Key Password</label>
                <input type="password" id="adminPassword" name="adminPassword" placeholder="••••••••••••" value={formData.adminPassword} onChange={handleChange} className={inputStyles} required />
              </div>
              <div>
                <label htmlFor="verificationStatus" className={labelStyles}>Node Verification State</label>
                <select id="verificationStatus" name="verificationStatus" value={formData.verificationStatus} onChange={handleChange} className={`${inputStyles} text-amber-500 font-bold`}>
                  <option value="Pending">Pending Evaluation</option>
                  <option value="Approved">Approved / Authorized</option>
                  <option value="Rejected">Flagged / Suspended</option>
                </select>
              </div>
            </div>
          </div>

          {/* ----------- REGISTRATION COMMIT COMMAND ----------- */}
          <div className="pt-6 flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto px-12 py-4 font-mono font-black text-xs tracking-widest uppercase text-white bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 rounded-sm shadow-xl shadow-red-950/40 transform active:scale-[0.99] transition-all duration-200"
            >
              Commit Node Registration
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Content;