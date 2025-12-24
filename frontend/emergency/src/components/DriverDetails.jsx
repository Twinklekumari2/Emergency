import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import './../styles/driverDetail.css'
import {api} from './../api'

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
        console.log(err);
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
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Update UI without refetch
      setDetails(prev =>
        prev.map(d =>
          d._id === id ? { ...d, status: statusValue } : d
        )
      );

      toast.success("Status Updated Successfully");
      setEditingId(null);
    } catch (err) {
      console.log(err);
      toast.error("Update Failed");
    }
  };

  return (
    <div>
      <h1>Driver Details</h1>
      <div className='driver'>
      {details
  .filter(detail => detail.hospitalId === hospitalId)
  .map(detail => (
    <div key={detail._id} className='driver-detail'>
      <p><b>Driver Name:</b> {detail.driverName}</p>
      <p><b>Contact:</b> {detail.contact}</p>

      {editingId === detail._id ? (
        <>
          <select
            value={statusValue}
            onChange={(e) => setStatusValue(e.target.value)}
          >
            <option value="available" >Available</option>
            <option value="busy">Busy</option>
          </select>

          <button onClick={() => handleUpdate(detail._id)} className='driver-button'>Save</button>
          <button onClick={() => setEditingId(null)} className='driver-button'>Cancel</button>
        </>
      ) : (
        <>
          <p><b>Status:</b> {detail.status}</p>
          <button onClick={() => handleEdit(detail._id, detail.status)} className='driver-button'>
            Edit Status
          </button>
        </>
      )}
    </div>
        
      ))}
      </div>

    </div>
  );
};

export default DriverDetails;
