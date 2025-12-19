import React, { useState } from 'react'
import './../styles/profile.css'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faPen } from "@fortawesome/free-solid-svg-icons";
import DriverDetails from './DriverDetails';

const Profile = ({ data }) => {

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...data });
  const [ambulanceData, setAmbulanceData] = useState({
    hospitalId:`${data._id}`,
    driverName:"",
    contact:"",
    status:"",
  })

  const handleLogout = async () => {
    localStorage.removeItem("hospital");
    window.location.href = '/login/hospital'
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleChangeAmbulance = (e) => {
    setAmbulanceData({
      ...ambulanceData,
      [e.target.name] : e.target.value
    });
  }
  const handleSubmit = async () => {
    // later you can call API here
    const token = localStorage.getItem("hospital");
    const url = `http://localhost:4000/hospital/ambulance/${data._id}`;
    const res = await axios.post(
      url,
      ambulanceData,
      {
        headers:{
          Authorization : `Bearer ${token}`
        }
      }
    )
    console.log("Updated Data:", res.data.response);
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
            <p>{formData.hospitalType}, {formData.ownership}, {formData.establishedYear}</p>
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
                <label htmlFor="hospitalName">Hospital Name</label>
                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                />

                <label htmlFor="officialEmail">E-mail</label>
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

        <DriverDetails hospitalId={data._id} />

      </div>

      {/* --------- MIDDLE SIDE -------------- */}

      <div>
        <h1>Add Ambulance Details</h1>
        <div>
          <form onSubmit={handleSubmit}>
          <div>
          <label htmlFor="driverName">Driver Name</label>
          <input type="text" 
          name="driverName" 
          id="driverName" 
          value={ambulanceData.driverName}
          onChange={handleChangeAmbulance}
          />
          </div>

          <div>
            <label htmlFor="contact">Contact</label>
            <input type="text" 
            name="contact" 
            id="contact" 
            value={ambulanceData.contact}
            onChange={handleChangeAmbulance}
            />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select name="status"
             id="status"
             value={ambulanceData.status}
             onChange={handleChangeAmbulance}
             >
              <option value="">Select</option>
              <option value="available">Available</option>
              <option value="busy">Busy</option>
             </select>
          </div>

          <div className='profile-btns'>
            <button>SUBMIT</button>
          </div>
          </form>
          
          
        </div>

      </div>

      {/* -------- RIGHT SIDE -------- */}
      <div>

        {editMode ? (
          <>
            <div>
              <label htmlFor="ambulanceCount">Ambulance Count</label>
            <input name="ambulanceCount" id='ambulanceCount' value={formData.ambulanceCount} onChange={handleChange} />
            </div>
            

            <div>
              <label htmlFor="availableAmbulances">Available Ambulances</label>
            <input name="availableAmbulances" id='availableAmbulances' value={formData.availableAmbulances} onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="totalBeds">Total Beds</label>
            <input name="totalBeds" id='totalBeds' value={formData.totalBeds} onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="icuBeds">ICU Beds</label>
            <input name="icuBeds" id='icuBeds' value={formData.icuBeds} onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="oxygenBeds">Oxygen Beds</label>
            <input name="oxygenBeds" id='oxygenBeds' value={formData.oxygenBeds} onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="availableBeds">Available Beds</label>
            <input name="availableBeds" id='availableBeds' value={formData.availableBeds} onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="ventilators">Ventilators</label>
              <input name="ventilators" id='ventilators' value={formData.ventilators} onChange={handleChange} />
            </div>


            <div className='profile-btns'>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
            </div>
          </>
        ) : (
          <>
             <div className='logout'>
              <div className='profile-btns' onClick={handleLogout}>
                  <button>Logout</button>
              </div>
             </div>
            <p>Ambulance: <span className='profile-data'> {formData.ambulanceCount}</span></p>

            <p>Available Ambulance: <span className='profile-data'>{formData.availableAmbulances}</span></p>

            <p>Total Beds: <span className='profile-data'>{formData.totalBeds}</span></p>

            <p>ICU Beds: <span className='profile-data'>{formData.icuBeds}</span></p>

            <p>Oxygen Beds: <span className='profile-data'>{formData.oxygenBeds}</span></p>

            <p>Available Beds: <span className='profile-data'>{formData.availableBeds}</span></p>

            <p>Ventilators: <span className='profile-data'>{formData.ventilators}</span></p>
            <p>Last Updated: {formData.lastUpdated}</p>
          </>
        )}

      </div>
    </div>
  );
};

export default Profile;
