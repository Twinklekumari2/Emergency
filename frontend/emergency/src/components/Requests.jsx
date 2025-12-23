import React, { useEffect } from 'react'
import './../styles/requestt.css'
import axios from 'axios'

const Requests = () => {
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

        }
    })
  return (
    <div className='requests'>
        Requests
    </div>
  )
}

export default Requests