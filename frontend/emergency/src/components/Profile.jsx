import React from 'react'
import './../styles/profile.css'

const Profile = ({data}) => {
  return (
    <div className='profile'>
        <div>
            <h1>hospital Name : {data.hospitalName}</h1>
        </div>
    </div>
  )
}

export default Profile