import React, { useState } from 'react'
import './../styles/profile.css'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faPen } from "@fortawesome/free-solid-svg-icons";
import DriverDetails from './DriverDetails';
import { useNavigate } from 'react-router-dom';

const Profile = ({ data }) => {
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...data });

  const [ambulanceData, setAmbulanceData] = useState({
    hospitalId: data._id,
    driverName: "",
    contact: "",
    status: "",
  });

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
    const token = localStorage.getItem("hospital");

    await axios.post(
      `http://localhost:4000/hospital/ambulance/${data._id}`,
      ambulanceData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const handleSave = async () => {
    const token = localStorage.getItem("hospital");

    await axios.put(
      `http://localhost:4000/hospital/update/${formData._id}`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData({ ...data });
    setEditMode(false);
  };

  return (
    <div className='profile'>

      {/* ================= LEFT SIDE ================= */}
      <div className='profile-left-side'>

        {/* ---- Hospital Card ---- */}
        <div className='profile-left-upper'>

          <div className='profile-left-upper-left'>
            <img src={formData.imageOfHospital} alt="hospital" />
            <p>{formData.hospitalType}, {formData.ownership}, {formData.establishedYear}</p>
          </div>

          <div className='profile-left-upper-right'>
            <div className='profile-left-upper-right-name'>
              <h2>{formData.registrationNo}</h2>

              <a href={formData.website} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGlobe} />
              </a>

              <button className="edit-btn" onClick={() => setEditMode(true)}>
                <FontAwesomeIcon icon={faPen} /> Edit
              </button>
            </div>

            {editMode ? (
              <>
                <label>Hospital Name</label>
                <input
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                />

                <label>Email</label>
                <input
                  name="officialEmail"
                  value={formData.officialEmail}
                  onChange={handleChange}
                />
              </>
            ) : (
              <>
                <h2>{formData.hospitalName}</h2>
                <p>{formData.officialEmail}</p>

                <div className='request' onClick={() => navigate('/requests')}>
                  Requests
                </div>
              </>
            )}
          </div>
        </div>

        {/* ---- Admin Info ---- */}
        <div className="profile-card">
          <h1>Admin Details</h1>
          <p>Name: {formData.adminName}</p>
          <p>Role: {formData.adminRole}</p>
          <p>Email: {formData.adminEmail}</p>
        </div>

        <DriverDetails hospitalId={data._id} />
      </div>

      {/* ================= MIDDLE SIDE ================= */}
      <div className="profile-middle-side">
        <h1>Add Ambulance</h1>

        <form onSubmit={handleSubmit}>
          <label>Driver Name</label>
          <input name="driverName" onChange={handleChangeAmbulance} />

          <label>Contact</label>
          <input name="contact" onChange={handleChangeAmbulance} />

          <label>Status</label>
          <select name="status" onChange={handleChangeAmbulance}>
            <option value="">Select</option>
            <option value="available">Available</option>
            <option value="busy">Busy</option>
          </select>

          <div className='profile-btns'>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="profile-right-side">

        {editMode ? (
          <>
            <label>Total Ambulance</label>
            <input name="ambulanceCount" value={formData.ambulanceCount} onChange={handleChange} />

            <label>Available Ambulances</label>
            <input name="availableAmbulances" value={formData.availableAmbulances} onChange={handleChange} />

            <label>Total Beds</label>
            <input name="totalBeds" value={formData.totalBeds} onChange={handleChange} />

            <label>ICU Beds</label>
            <input name="icuBeds" value={formData.icuBeds} onChange={handleChange} />

            <label>Oxygen Beds</label>
            <input name="oxygenBeds" value={formData.oxygenBeds} onChange={handleChange} />

            <label>Available Beds</label>
            <input name="availableBeds" value={formData.availableBeds} onChange={handleChange} />

            <label>Ventilators</label>
            <input name="ventilators" value={formData.ventilators} onChange={handleChange} />

            <div className='profile-btns'>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <div className="logout">
              <div className='profile-btns'>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>

            <p>Ambulances: <span className="profile-data">{formData.ambulanceCount}</span></p>
            <p>Available: <span className="profile-data">{formData.availableAmbulances}</span></p>
            <p>Total Beds: <span className="profile-data">{formData.totalBeds}</span></p>
            <p>ICU Beds: <span className="profile-data">{formData.icuBeds}</span></p>
            <p>Oxygen Beds: <span className="profile-data">{formData.oxygenBeds}</span></p>
            <p>Available Beds: <span className="profile-data">{formData.availableBeds}</span></p>
            <p>Ventilators: <span className="profile-data">{formData.ventilators}</span></p>
            <p>Last Updated: {formData.lastUpdated}</p>
          </>
        )}
      </div>

    </div>
  );
};

export default Profile;
