import React from 'react'
import Navbar from './components/Navbar'
import { Route,Routes,Navigate, useNavigate} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        {/* <Route path='/near-by' element={<NearBy/>}/>
        <Route path='/ambulance' element={<Ambulance/>}/>
        <Route path='/about-us' element={<About/>}/> */}
      </Routes>
    </div>
  )
}

export default App