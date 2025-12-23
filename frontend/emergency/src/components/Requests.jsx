import React, { useEffect, useState } from 'react'
import './../styles/requestt.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';


const Requests = () => {
    const location = useLocation();
    const hospital = location.state?.hospitalData;

    const [reqData, setReqData] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        const getRequest = async () =>{
            const token = localStorage.getItem("hospital");
            const url = 'http://localhost:4000/patient/request'

            const res = await axios.get(url,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("response:", res);
            console.log("response:", res.data.response);
            setReqData(res.data.response);
        }
        getRequest();
    },[])
  return (
    <div className='requests'>
        <div className='hospital-Name'>
            <h1>{hospital.hospitalName}</h1>
        </div>
        <div className='patient-detail'>
            {reqData.map((request, index) => (
                <div key={request._id} className='individual-patient-detail'>
                    <div className='name-section'>
                    <h2>{request.contactName}, {request.bloodGroup}</h2>
                   <div className='req-btns'> 
                        <div className='accept'>Accept</div>
                        <div className='ignore'>Ignore</div>
                        <div onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                            <FontAwesomeIcon icon={faChevronDown} size="lg" style={{ color: "#ffffff", transform: openIndex === index ? "rotate(90deg)" : "rotate(0deg)",}} />
                        </div>
                    </div>
                    </div>
                    <div className='contact-section'>
                        {openIndex === index && (
                            <div className='patient-details'>
                                <p>Relaitonship to Patient:- {request.relationToPatient}</p>
                                <p>Notes:- {request.notes}</p>
                                <p>Contact No:- {request.contactPhone}</p>
                                <p>Contact Email:- {request.contactEmail}</p>
                            </div>
                        )}
                    </div>


                    

                </div>
            ))}
        </div>
    </div>
  )
}

export default Requests