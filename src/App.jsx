import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import Rediriguir from './Pages/Rediriguir'
import Proteger from './Pages/Proteger'
import DashboardPageStudent from './Pages/Student/DashboardPageStudent'
import Examenespages from './Pages/Student/Examenespages'
import Exampage from './Pages/Student/Exampage'
import VideoPage from './Pages/Student/VideoPage'
import AlumnosTable from './Pages/Teacher/AlumnosTable'
import NewIncidentPage from './Pages/Teacher/NewIncidentPage'
import EditIncidentPage from './Pages/Teacher/EditIncidentPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App() {
  return (
    <div>
    <Routes>
      <Route path='/' element={ <Rediriguir/>}/>
      <Route path='/login' element={<LoginPage />} />
      <Route  element={<Proteger/>} >
        <Route path='/dashboard' element={<DashboardPageStudent/>} />
        <Route path='/examenes' element={<Examenespages/>} />
        <Route path='/examenes/:id' element={<Exampage/>} />
        <Route path='/videos/me' element={<VideoPage/>} />
        <Route path='/reportes' element={<AlumnosTable/>}/>
        <Route path='/reportes/:id' element={<EditIncidentPage/>} />
        <Route path='/incidente/create' element={<NewIncidentPage/>}/>
      </Route>
    </Routes>
    <ToastContainer />
    </div>
  )
}