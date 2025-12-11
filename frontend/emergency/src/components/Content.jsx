import React, { useState } from "react";
import "./../styles/content.css";
import axios from "axios";

const Content = () => {
  const [formData, setFormData] = useState({
    // Basic Hospital Info
    hospitalName: "",
    registrationNo: "",
    hospitalType: "",
    ownership: "",
    establishedYear: "",

    // Address
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    pincode: "",
    state: "",

    // Location
    latitude: "",
    longitude: "",

    // Contact
    officialEmail: "",
    officialPhone: "",
    emergencyPhone: "",
    website: "",

    // Facilities
    totalBeds: "",
    icuBeds: "",
    oxygenBeds: "",
    ventilators: "",
    ambulanceCount: "",
    is24X7: "",
    departments: "",

    // Live Availability
    isAcceptingEmergency: "",
    availableBeds: "",
    availableAmbulances: "",
    lastUpdated: "",

    // Documents
    hospitalLicenseUrl: "",
    aadhaarOrPanUrl: "",
    fireSafetyCertificate: "",
    imageOfHospital: "",

    // Admin Info
    adminName: "",
    adminRole: "",
    adminPhone: "",
    adminEmail: "",
    adminPassword: "",

    // Verification
    verificationStatus: "Pending",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:4000/hospital/hospitals",
        formData
      );
      

      alert("Request sent successfully!");
      setFormData({
         // Basic Hospital Info
    hospitalName: "",
    registrationNo: "",
    hospitalType: "",
    ownership: "",
    establishedYear: "",

    // Address
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    pincode: "",
    state: "",

    // Location
    latitude: "",
    longitude: "",

    // Contact
    officialEmail: "",
    officialPhone: "",
    emergencyPhone: "",
    website: "",

    // Facilities
    totalBeds: "",
    icuBeds: "",
    oxygenBeds: "",
    ventilators: "",
    ambulanceCount: "",
    is24X7: "",
    departments: "",

    // Live Availability
    isAcceptingEmergency: "",
    availableBeds: "",
    availableAmbulances: "",
    lastUpdated: "",

    // Documents
    hospitalLicenseUrl: "",
    aadhaarOrPanUrl: "",
    fireSafetyCertificate: "",
    imageOfHospital: "",

    // Admin Info
    adminName: "",
    adminRole: "",
    adminPhone: "",
    adminEmail: "",
    adminPassword: "",

    // Verification
    verificationStatus: "Pending",
      })
      const token = res.data.token;
      localStorage.setItem("token", token);
      console.log("Token saved:", token);


    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    }
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="content">
      <div className="upper-heading">
        <h1 className="c-heading">This Section is only for HOSPITAL</h1>
        <h3>"signup/login to add your hospital"</h3>
      </div>

      <div className="content-upper">
        <form className="form-hospital" onSubmit={handleSubmit}>
          {/* BASIC DETAILS */}
          <div className="basic-details">
            <h1 className="detail-heading">Hospital Basic Details</h1>
            <div className="details">
            <div className="details-label">
              <label htmlFor="hospitalName">Hospital Name</label>
              <input
                type="text"
                id="hospitalName"
                name="hospitalName"
                placeholder="e.g. City Heart Hospital"
                value={formData.hospitalName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="registrationNo">Registration Number</label>
              <input
                type="text"
                name="registrationNo"
                id="registrationNo"
                placeholder="e.g. REG-982374"
                value={formData.registrationNo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="hospitalType">Hospital Type</label>
              <input
                type="text"
                name="hospitalType"
                id="hospitalType"
                placeholder="e.g Govt / Private / Clinic / NGO"
                value={formData.hospitalType}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="ownership">Ownership</label>
              <input
                type="text"
                name="ownership"
                id="ownership"
                placeholder="e.g Individual / Trust / Govt"
                value={formData.ownership}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="establishedYear">Established Year</label>
              <input
                type="number"
                id="establishedYear"
                name="establishedYear"
                placeholder="e.g. 1986"
                value={formData.establishedYear}
                onChange={handleChange}
                required
              />
            </div>
            </div>
          </div>

          <div className="add-loc">
            <h1 className="detail-heading">Address & Location</h1>

            <div className="details">
            <div className="details-label">
              <label htmlFor="addressLine1">Address Line 1</label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                placeholder="e.g Saraswati Vihar"
                value={formData.addressLine1}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="addressLine2">Address Line 2</label>
              <input
                type="text"
                id="addressLine2"
                name="addressLine2"
                placeholder="e.g Rohta Road"
                value={formData.addressLine2}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="e.g Meerut"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="district">District</label>
              <input
                type="text"
                id="district"
                name="district"
                placeholder="e.g Meerut"
                value={formData.district}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                id="state"
                placeholder="e.g Uttar Pradesh"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="pincode">Pincode</label>
              <input
                type="number"
                name="pincode"
                id="pincode"
                placeholder="e.g 250001"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="text"
                name="latitude"
                id="latitude"
                placeholder="e.g 28.984"
                value={formData.latitude}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="text"
                name="longitude"
                id="longitude"
                placeholder="e.g 77.706"
                value={formData.longitude}
                onChange={handleChange}
                required
              />
            </div>
            </div>
          </div>

          {/* CONTACT */}
          <div className="contact-details">
            <h1 className="detail-heading">Contact Details</h1>
            <div className="details">
            <div className="details-label">
              <label htmlFor="officialEmail">Official Email</label>
              <input
                type="email"
                name="officialEmail"
                id="officialEmail"
                placeholder="e.g hospital@example.com"
                value={formData.officialEmail}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="officialPhone">Official Phone No</label>
              <input
                type="tel"
                name="officialPhone"
                id="officialPhone"
                placeholder="e.g 0123-987654"
                value={formData.officialPhone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="emergencyPhone">Emergency Phone</label>
              <input
                type="tel"
                name="emergencyPhone"
                id="emergencyPhone"
                placeholder="e.g +91 98765 43210"
                value={formData.emergencyPhone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="website">Website</label>
              <input
                type="url"
                name="website"
                id="website"
                placeholder="e.g https://"
                value={formData.website}
                onChange={handleChange}
                required
              />
            </div>
            </div>
          </div>

          {/* FACILITIES */}
          <div className="facilities">
            <h1 className="detail-heading">Hospital Facilities Information</h1>
            <div className="details">
            <div className="details-label">
              <label htmlFor="totalBeds">Total Beds</label>
              <input
                type="number"
                name="totalBeds"
                id="totalBeds"
                placeholder="e.g 150"
                value={formData.totalBeds}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="icuBeds">ICU Beds</label>
              <input
                type="number"
                name="icuBeds"
                id="icuBeds"
                placeholder="e.g 20"
                value={formData.icuBeds}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="oxygenBeds">Oxygen Beds</label>
              <input
                type="number"
                name="oxygenBeds"
                id="oxygenBeds"
                placeholder="e.g 50"
                value={formData.oxygenBeds}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="ventilators">Ventilators</label>
              <input
                type="number"
                name="ventilators"
                id="ventilators"
                placeholder="e.g 10"
                value={formData.ventilators}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="ambulanceCount">Ambulance Count</label>
              <input
                type="number"
                name="ambulanceCount"
                id="ambulanceCount"
                placeholder="e.g 3"
                value={formData.ambulanceCount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="is24X7">Is 24x7 Available?</label>
              <select
                name="is24X7"
                id="is24X7"
                value={formData.is24X7}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="details-label">
              <label htmlFor="departments">Departments</label>
              <input
                type="text"
                name="departments"
                id="departments"
                placeholder="e.g Cardiology, Neurology, Emergency..."
                value={formData.departments}
                onChange={handleChange}
                required
              />
            </div>
            </div>
          </div>

          {/* DOCUMENTS */}
          <div className="documents">
            <h1 className="detail-heading">Documents for Verification</h1>
            <div className="details">
            <div className="details-label">
              <label htmlFor="hospitalLicenseUrl">Hospital License URL</label>
              <input
                type="url"
                id="hospitalLicenseUrl"
                name="hospitalLicenseUrl"
                placeholder="e.g https://license-url"
                value={formData.hospitalLicenseUrl}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="aadhaarOrPanUrl">Aadhaar / PAN URL</label>
              <input
                type="url"
                id="aadhaarOrPanUrl"
                name="aadhaarOrPanUrl"
                placeholder="e.g https://aadhaar-or-pan"
                value={formData.aadhaarOrPanUrl}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="fireSafetyCertificate">
                Fire Safety Certificate (URL)
              </label>
              <input
                type="url"
                id="fireSafetyCertificate"
                name="fireSafetyCertificate"
                placeholder="e.g https://fire-certificate (optional)"
                value={formData.fireSafetyCertificate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="imageOfHospital">Hospital Image URL</label>
              <input
                type="url"
                id="imageOfHospital"
                name="imageOfHospital"
                placeholder="e.g https://image-url"
                value={formData.imageOfHospital}
                onChange={handleChange}
                required
              />
            </div>
            </div>
          </div>

          {/* LIVE AVAILABILITY */}
          <div className="availability">
            <h1 className="detail-heading">Availability / Live Status</h1>
             <div className="details">
            <div className="details-label">
              <label htmlFor="isAcceptingEmergency">
                Accepting Emergency?
              </label>
              <select
                name="isAcceptingEmergency"
                id="isAcceptingEmergency"
                value={formData.isAcceptingEmergency}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="details-label">
              <label htmlFor="availableBeds">Available Beds</label>
              <input
                type="number"
                id="availableBeds"
                name="availableBeds"
                placeholder="e.g 12"
                value={formData.availableBeds}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="availableAmbulances">Available Ambulances</label>
              <input
                type="number"
                id="availableAmbulances"
                name="availableAmbulances"
                placeholder="e.g 3"
                value={formData.availableAmbulances}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="lastUpdated">Last Updated</label>
              <input
                type="datetime-local"
                id="lastUpdated"
                name="lastUpdated"
                value={formData.lastUpdated}
                onChange={handleChange}
                required
              />
            </div>
             </div>
          </div>

          {/* ADMIN INFO */}
          <div className="admin-info">
            <h1 className="detail-heading">Admin Staff Information</h1>
            <div className="details">

            
            <div className="details-label">
              <label htmlFor="adminName">Admin Name</label>
              <input
                type="text"
                id="adminName"
                name="adminName"
                placeholder="e.g Dr. Rakesh Sharma"
                value={formData.adminName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="adminRole">Admin Role</label>
              <input
                type="text"
                id="adminRole"
                name="adminRole"
                placeholder="e.g Manager / Receptionist / Doctor"
                value={formData.adminRole}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="adminPhone">Admin Phone</label>
              <input
                type="tel"
                id="adminPhone"
                name="adminPhone"
                placeholder="e.g +91 XXXXX XXXXX"
                value={formData.adminPhone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="adminEmail">Admin Email</label>
              <input
                type="email"
                id="adminEmail"
                name="adminEmail"
                placeholder="e.g admin@example.com"
                value={formData.adminEmail}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="adminPassword">Admin Password</label>
              <input
                type="password"
                id="adminPassword"
                name="adminPassword"
                placeholder="e.g Enter password"
                value={formData.adminPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="details-label">
              <label htmlFor="verificationStatus">Verification Status</label>
              <select
                name="verificationStatus"
                id="verificationStatus"
                value={formData.verificationStatus}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            </div>
          </div>
          <input type="submit" className="submit" />
        </form>
      </div>
    </div>
  );
};

export default Content;
