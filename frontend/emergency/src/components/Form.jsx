import React, { useState } from "react";
import "./../styles/form.css";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    relationshipToPatient: "",
    bloodGroup: "",
    notes: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    hospitalId: "" ,
    location:"",
    address:""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:4000/patient/request",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Request sent successfully!");
      setFormData({
  relationshipToPatient: "",
  bloodGroup: "",
  notes: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  hospitalId: "",
  location:"",
  address:""
});


    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-form">
          <div className="form-form-hospital">
            <h1>Hospital Details</h1>
            <div className="form-form-hospital-detail">
              <div className="form-data">
                <label htmlFor="hospitalId">Hospital Id <span>*</span></label>
                <input type="text" name="hospitalId" id="hospitalId" placeholder="Copy and paste the hospital Id" value={formData.hospitalId} onChange={handleChange} required />
              </div>
            </div>
          </div>
          {/* UPPER FORM */}
          <div className="upper-form">
            <h1>PATIENT INFORMATION</h1>
            <div className="upper-form-content">

              <div className="upper-form-content-1">
                <div className="form-data">
                  <label htmlFor="relationshipToPatient">
                    Relationship to patient <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="relationshipToPatient"
                    id="relationshipToPatient"
                    placeholder="e.g Mother, Father, Friend etc"
                    value={formData.relationshipToPatient}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-data">
                  <label htmlFor="bloodGroup">
                    Blood Group <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="bloodGroup"
                    id="bloodGroup"
                    placeholder="e.g AB+, A+, O- etc"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-data">
                <label htmlFor="notes">
                  Notes About the Patient <span>*</span>
                </label>
                <textarea
                  name="notes"
                  id="notes"
                  placeholder="Describe the patient’s condition..."
                  value={formData.notes}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>
          </div>

          {/* LOWER FORM */}
          <div className="lower-form">
            <h1>CONTACT INFORMATION</h1>

            <div className="lower-form-content">
              <div className="form-data">
                <label htmlFor="contactName">
                  Contact Name <span>*</span>
                </label>
                <input
                  type="text"
                  name="contactName"
                  id="contactName"
                  placeholder="e.g Twinkle Kumari"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-data">
                <label htmlFor="location">
                  Location <span>*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="78 23"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-data">
                <label htmlFor="address">
                  Address <span>*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="e.g ABC Colony"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="upper-form-content-1">

                <div className="form-data">
                  <label htmlFor="contactPhone">
                    Contact No. <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="contactPhone"
                    id="contactPhone"
                    placeholder="e.g +91 9045X XXXX7"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-data">
                  <label htmlFor="contactEmail">
                    Contact Email <span>*</span>
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    id="contactEmail"
                    placeholder="e.g twinkle246@example.com"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SUBMIT */}
          <div className="submit-form">
             <input type="submit" />
          </div>

        </div>
      </form>
    </div>
  );
};

export default Form;
