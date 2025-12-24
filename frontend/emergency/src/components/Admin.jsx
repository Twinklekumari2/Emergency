import React, { useEffect, useState } from 'react'
import './../styles/admin.css'
import axios from 'axios'
import dropdown from './../assets/down.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import { api } from './../api'

const Admin = () => {
    const [data, setData] = useState({});
    const [openIndex, setOpenIndex] = useState(null);

    async function handleApprove(id){
        const token = localStorage.getItem("admin");
        const res = await api.patch(`/user/approve/${id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        console.log(res);
        toast.success("Hospital Approved");
    }

    async function handleReject(id){
        const token = localStorage.getItem("admin");
        const url = `/user/reject/${id}`;
        const res = await api.patch(url,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        console.log(res);
        toast.success("Hospital Reject");
    }

    useEffect(() => {
        const getData = async () => {
            const token = localStorage.getItem("admin");
            const res = await api.get('/hospital/list',{
                headers: {
                    Authorization:`Bearer ${token}`
                }
            })
            console.log(res.data);
            setData(res.data);
        }
        getData();
    }, [])

  return (
    <div className='admin'>
        <Navbar/>
        <div>
            <h1>List of Hospitals</h1>
            <div>
                <h2 className='pending'>Pending Hospitals</h2>
            <div>
                {data.response?.map((item, index) => (
                    <div key={index}>
                        {item.verificationStatus === "Pending" ? (
                            <div>
                                <div 
                                className='admin-heading'
                                    >
                                    <h1>RegNo. {item.registrationNo}, {item.hospitalName}</h1>
                                    <div className='admin-btn'>
                                    <button className='btn-approve'
                                    onClick={() => handleApprove(item._id)}
                                    >
                                        Approve
                                    </button>
                                    <button className='btn-reject'
                                    onClick={() => handleReject(item._id)}
                                    >
                                        Reject
                                    </button>
                                    <button className='arrow'
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)} 
                                    >
                                         <FontAwesomeIcon 
     icon={faChevronDown} 
     size="lg"
     style={{ color: "#ffffff" }} 
  />
                                    </button>
                                    </div>
                                    
                                </div>
                                {openIndex === index && (
                                  <div className='admin-detail'>
                                    <div>
                                        <h2>Basic Hospital Info</h2>
                                        <h3>Hospital Name - {item.hospitalName}</h3>
                                        <h3>Registration Number - {item.registrationNo}</h3>
                                        <h3>
                                            Hospital Type - {item.hospitalType}
                                        </h3>
                                        <h3>Ownership - {item.ownership}</h3>
                                        <h3>Established Year - {item.establishedYear}</h3>
                                    </div>
                                    <div>
                                        <h2>Admin Info</h2>
                                        <h3>Admin Name - {item.adminName}</h3>
                                        <h3>Admin Role - {item.adminRole}</h3>
                                        <h3>Admin Phone Number - {item.adminPhone}</h3>
                                        <h3>Admin Email - {item.adminEmail}</h3>
                                    </div>
                                    <div>
                                        <h2>Contact Info</h2>
                                        <h3>Official Email - {item.officialEmail}</h3>
                                        <h3>Official Phone - {item.officialPhone}</h3>
                                        <h3>Emergency Phone - {item.emergencyPhone}</h3>
                                        <h3>Website - {item.website}</h3>
                                    </div>
                                    <div>
                                        <h2>Facilities</h2>
                                        <h3>Total Beds - {item.totalBeds}</h3>
                                        <h3>ICU Beds - {item.icuBeds}</h3>
                                        <h3>Oxygen Beds - {item.oxygenBeds}</h3>
                                        <h3>Ventilators - {item.ventilators}</h3>
                                        <h3>Ambulance Count - {item.ambulanceCount}</h3>
                                        <h3>Is 24x& Available - {item.is24X7}</h3>
                                        <h3>Departments - {item.departments}</h3>
                                    </div>
                                    <div>
                                        <h2>Live Availability</h2>
                                        <h3>Is Accepting Emergency - {item.isAcceptingEmergency}</h3>
                                        <h3>Available Beds - {item.availableBeds}</h3>
                                        <h3>Available Ambulance - {item.availableAmbulances}</h3>
                                    </div>
                                    <div>
                                        <h2>Documents</h2>
                                        <h3>Hospital License URL - <a href={item.hospitalLicenseUrl}>click here</a> </h3>
                                        <h3>Aadhar Or PAN Url - 
                                            <a href={item.aadhaarOrPanUrl}>click here</a></h3>
                                        <h3> Fire Safety Certificate - <a href={item.fireSafetyCertificate}>click here</a></h3>
                                        <h3>Image of Hospital - <a href={item.imageOfHospital}>click here</a></h3>
                                    </div>
                                    <div>
                                        <h2>Address</h2>
                                        <h3>Address Line 1 - {item.addressLine1}</h3>
                                        <h3>Address Line 2 - {item.addressLine2}</h3>
                                        <h3>City - {item.city}</h3>
                                        <h3>District - {item.district}</h3>
                                        <h3>Pincode - {item.pincode}</h3>
                                        <h3>State - {item.state}</h3>
                                    </div>
                                  </div>
                                )}
                            </div>
                        ) : (
                            <p></p>
                        )}
                    </div>
                ))}
            </div>
            </div>
              
            <div>
                <h2 className='approve'>Approved Hospitals</h2>
             <div>
                {data.response?.map((item, index) => (
                    <div key={index}>
                        {item.verificationStatus === "Approved" ? (
                            <div>
                                <div 
                                className='admin-heading'
                                    >
                                    <h1>RegNo. {item.registrationNo}, {item.hospitalName}</h1>
                                    <div className='admin-btn'>
                                    <button className='arrow'
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)} 
                                    >
                                         <FontAwesomeIcon 
                                      icon={faChevronDown} 
                                      size="lg"
                                      style={{ color: "#ffffff" }} 
                                   />
                                    </button>
                                    </div>
                                    
                                </div>
                                {openIndex === index && (
                                  <div className='admin-detail'>
                                    <div>
                                        <h1>Basic Hospital Info</h1>
                                        <h3>Hospital Name - {item.hospitalName}</h3>
                                        <h3>Registration Number - {item.registrationNo}</h3>
                                        <h3>
                                            Hospital Type - {item.hospitalType}
                                        </h3>
                                        <h3>Ownership - {item.ownership}</h3>
                                        <h3>Established Year - {item.establishedYear}</h3>
                                    </div>
                                    <div>
                                        <h1>Admin Info</h1>
                                        <h3>Admin Name - {item.adminName}</h3>
                                        <h3>Admin Role - {item.adminRole}</h3>
                                        <h3>Admin Phone Number - {item.adminPhone}</h3>
                                        <h3>Admin Email - {item.adminEmail}</h3>
                                    </div>
                                    <div>
                                        <h1>Contact Info</h1>
                                        <h3>Official Email - {item.officialEmail}</h3>
                                        <h3>Official Phone - {item.officialPhone}</h3>
                                        <h3>Emergency Phone - {item.emergencyPhone}</h3>
                                        <h3>Website - {item.website}</h3>
                                    </div>
                                    <div>
                                        <h1>Facilities</h1>
                                        <h3>Total Beds - {item.totalBeds}</h3>
                                        <h3>ICU Beds - {item.icuBeds}</h3>
                                        <h3>Oxygen Beds - {item.oxygenBeds}</h3>
                                        <h3>Ventilators - {item.ventilators}</h3>
                                        <h3>Ambulance Count - {item.ambulanceCount}</h3>
                                        <h3>Is 24x& Available - {item.is24X7}</h3>
                                        <h3>Departments - {item.departments}</h3>
                                    </div>
                                    <div>
                                        <h1>Live Availability</h1>
                                        <h3>Is Accepting Emergency - {item.isAcceptingEmergency}</h3>
                                        <h3>Available Beds - {item.availableBeds}</h3>
                                        <h3>Available Ambulance - {item.availableAmbulances}</h3>
                                    </div>
                                    <div>
                                        <h1>Documents</h1>
                                        <h3>Hospital License URL - <a href= {item.hospitalLicenseUrl}>click here</a> </h3>
                                        <h3>Aadhar Or PAN Url - <a href={item.aadhaarOrPanUrl}>click here</a> </h3>
                                        <h3>Fire Safety Certificate - <a href={item.fireSafetyCertificate}>click here</a> </h3>
                                        <h3>Image of Hospital - <a href={item.imageOfHospital}>click here</a> </h3>
                                    </div>
                                    <div>
                                        <h1>Address</h1>
                                        <h3>Address Line 1 - {item.addressLine1}</h3>
                                        <h3>Address Line 2 - {item.addressLine2}</h3>
                                        <h3>City - {item.city}</h3>
                                        <h3>District - {item.district}</h3>
                                        <h3>Pincode - {item.pincode}</h3>
                                        <h3>State - {item.state}</h3>
                                    </div>
                                  </div>
                                )}
                            </div>
                        ) : (
                            <p></p>
                        )}
                    </div>
                ))}
            </div>
            </div>
            
            
        </div>
    </div>
  )
}

export default Admin