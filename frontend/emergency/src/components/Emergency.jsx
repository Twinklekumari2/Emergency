import React from 'react'
import './../styles/emergency.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';

const Emergencyy = () => {
    const navigate = useNavigate()
  const location = useLocation();
  const data = location.state?.hospital;

  if(!data){
    return <p>No data found</p>
  }

  const handleClick = () => {
    navigator.clipboard.writeText(data._id);
    toast.success("Copied to clipboard")
  }

  return ( 
    <div className='emergency'>
        <div className='emergency-name'>
        <h3>
            Hospital Id:- {data._id}
            <span onClick={handleClick}>
              <FontAwesomeIcon icon={faClipboard} />
            </span>
        </h3>
        <h1 >{data.hospitalName}</h1>
        <h2>Reg No. {data.registrationNo}</h2>
        </div>
        <div className='emergency-contact'>
        <div className='emergency-contact-left'> 
        
        <div className='emergency-facilities-detail'>
            <h1>Facilites Provided</h1>
            <div>
            <p>Total Beds:- {data.totalBeds}</p>
            <p>ICU Beds:- {data.icuBeds}</p>
            <p>Oxygen Beds:- {data.oxygenBeds}</p>
            <p>Ventilators:- {data.ventilators}</p>
            <p>Ambulance:- {data.ambulanceCount}</p>
            <p>24x7?? {data.is24X7}</p>
            <p>Departments: {data.departments}</p>
            </div>
        </div>
        <div className='emergency-live-detail'>
            <h1>Live Availability</h1>
            <div>
                <p>Accepting Emergency:- {data.isAcceptingEmergency}</p>
                <p>Available Beds:- {data.availableBeds}</p>
                <p>Available Ambulances:- {data.availableAmbulances}</p>
            </div>
        </div>
         </div>
        <div className='emergency-contact-middle'>
        <div className='emergency-admin-detail'>
            <h1>Admin Information</h1>
            <div>
                <p>Name:- {data.adminName}</p>
                <p>Role:- {data.adminRole}</p>
                <p>Phone:- {data.adminPhone}</p>
                <p>Email:- {data.adminEmail}</p>
            </div>
        </div>
        </div>
        
        <div className='emergency-contact-middle2'>
            <div className='emergency-contact-detail'>
            <h1>Contact Details</h1>
            <div>
                <p>Official Email:- {data.officialEmail}</p>
                <p>OfficialPhone:- {data.officialPhone}</p>
                <p>Emergency Phone:- {data.emergencyPhone}</p>
                <p>Website:- <a href={data.website}>{data.website}</a></p>
            </div>
        </div>
        <div className='emergency-address-detail'>
            <h1>Address</h1>
            <div>
                <p>{data.addressLine1} ,{data.addressLine2}</p>
                <p>{data.city}, {data.pincode}</p>
                <p>{data.district}, {data.state}</p>
            </div>
        </div>
        
        </div>
        
       
        </div>
        <div className='emergency-request'>
            <div className='emergency-reqBtn' onClick={() => navigate('/ambulance') }>
                Send Request
            </div>
        </div>
        
    </div>
  )
}

export default Emergencyy