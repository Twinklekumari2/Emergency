import React, { useState } from 'react'
import './../styles/profile.css'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faPen } from "@fortawesome/free-solid-svg-icons";

const Profile = ({ data }) => {

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...data });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    // later you can call API here
    const token = localStorage.getItem("hospital");
    const url = `http://localhost:4000/hospital/update/${formData._id}`;
    const res = await axios.put(
      url,
      formData,
      {
        headers:{
          Authorization : `Bearer ${token}`
        }
      }
    )
    console.log("Updated Data:", res.data.response);
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData({ ...data });
    setEditMode(false);
  };

  return (
    <div className='profile'>

      {/* -------- LEFT SIDE -------- */}
      <div className='profile-left-side'>

        {/* -------- UPPER -------- */}
        <div className='profile-left-upper'>

          <div className='profile-left-upper-left'>
            <img src={formData.imageOfHospital} alt="hospital" />
            <p>{formData.hospitalType} {formData.ownership} {formData.establishedYear}</p>
          </div>

          <div className='profile-left-upper-right'>

            {/* ---- Hospital Identity + Edit Button ---- */}
            <div className='profile-left-upper-right-name'>
              <h2>{formData.registrationNo}</h2>

              <a href={formData.website} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGlobe} style={{ color: "white" }} />
              </a>

              <button className="edit-btn" onClick={() => setEditMode(true)}>
                <FontAwesomeIcon icon={faPen} /> Edit Profile
              </button>
            </div>

            {/* ---- Editable Fields ---- */}
            {editMode ? (
              <>
                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="officialEmail"
                  value={formData.officialEmail}
                  onChange={handleChange}
                />
              </>
            ) : (
              <>
                <h2>{formData.hospitalName}</h2>
                <h2>{formData.officialEmail}</h2>
              </>
            )}

          </div>
        </div>

        {/* -------- ADMIN DETAILS -------- */}
        <div>
          <h1>Admin Details</h1>
          <p>Name: {formData.adminName}</p>
          <p>Role: {formData.adminRole}</p>
          <p>Email: {formData.adminEmail}</p>
        </div>

      </div>

      {/* -------- RIGHT SIDE -------- */}
      <div>

        {editMode ? (
          <>
            <input name="ambulanceCount" value={formData.ambulanceCount} onChange={handleChange} />
            <input name="availableAmbulances" value={formData.availableAmbulances} onChange={handleChange} />
            <input name="totalBeds" value={formData.totalBeds} onChange={handleChange} />
            <input name="icuBeds" value={formData.icuBeds} onChange={handleChange} />
            <input name="oxygenBeds" value={formData.oxygenBeds} onChange={handleChange} />
            <input name="availableBeds" value={formData.availableBeds} onChange={handleChange} />
            <input name="ventilators" value={formData.ventilators} onChange={handleChange} />

            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <>
            <p>Ambulance: {formData.ambulanceCount}</p>
            <p>Available Ambulance: {formData.availableAmbulances}</p>
            <p>Total Beds: {formData.totalBeds}</p>
            <p>ICU Beds: {formData.icuBeds}</p>
            <p>Oxygen Beds: {formData.oxygenBeds}</p>
            <p>Available Beds: {formData.availableBeds}</p>
            <p>Ventilators: {formData.ventilators}</p>
            <p>Last Updated: {formData.lastUpdated}</p>
          </>
        )}

      </div>
    </div>
  );
};

export default Profile;
