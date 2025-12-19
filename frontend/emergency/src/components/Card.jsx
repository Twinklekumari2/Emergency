import React, { useState } from 'react'
import './../styles/card.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useSearchParams } from 'react-router-dom';


const Card = ({data}) => {
    const navigate = useNavigate()
    const [hospitalData, setHospitalData] = useState();
    const handleClick = async () => {
        setHospitalData(data);
        navigate('/emergency/hospital');
    }
  return (
    <div className='card'>
        <div className='card-profile'>
            <div className='card-img-part'>
               <img src={data.imageOfHospital} alt="Hospital image" />
               <p className='hospital-name'>{data.hospitalName}</p>
            </div>
            <div className='card-hospital-info'>
                <div className='card-hospital-available'>
                     <p>
                       <FontAwesomeIcon icon={["fas", "ambulance"]} style={{color:"white", fontSize: "20px" }} />
                    </p>
                    <div>
                        {data.availableAmbulances > 0 ? <>
                         <p className='active-status'>
                            {data.availableAmbulances}
                         </p>
                     </> : 
                      <>
                      <p className='busy-status'>
                     </p>
                      </>}
                      
                    </div>
                </div>
                <div className='card-hospital-beds'>
                      <p>total beds: {data.totalBeds}</p>
                      <p>ICU Beds: {data.icuBeds}</p>
                      <p>Oxygen Beds: {data.oxygenBeds}</p>
                      <p>Available Beds: {data.availableBeds}</p>
                </div>
                <div className='card-hospital-contact'>
                      <p>{data.addressLine1}</p>
                      <p>{data.addressLine2}</p>
                      <p>{data.city}, {data.pincode}</p>
                      <p>{data.district}, {data.state}</p>
                </div>
            </div>
            <div className='card-hospital-button'>
                <button onClick={handleClick}>See More</button>
            </div>
        </div>

    </div>
  )
}

export default Card