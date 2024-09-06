import React, { useEffect, useState } from 'react';
import Select from '../Select';
import { getReportbyId, getReports, sendIncident, updateIncident } from '../../services/DataService';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const options = ['Robo','Falla eléctrica','Falla de agua','Falla de gas','Vidrios rotos']
const optionsStatus = ['Proceso','Resuelto']


const EditIncident = () => {
  const { id } = useParams();

  const [status,setStatus]=useState('')
  const [type,setType]=useState('')
  const [description,setDescription]=useState('')
  const [location,setLocation]=useState('')
  const [reportByUser,setReportByUser]=useState('')

  const [row,setRow]=useState(null)

  const navigate = useNavigate()

  const getData=async()=>{
    try {
      const data = await getReportbyId(id)
      setRow(data)
      setStatus(data?.status || '')
      setType(data?.incident_type || '')
      setDescription(data?.descripcion || '')
      setLocation(data?.location || '')
      setReportByUser(data?.reported_by || '')
    } catch (error) {
      setRow(null)
    }
   
   }
  useEffect(() => {
   getData()
  }, [])


const handleEnviar =async() =>{

  try {
    const dataProps= {
      "status": status,
      "incident_type": type,
      "descripcion": description,
      "location": location,
      "reported_by": reportByUser,
  }
  await updateIncident(dataProps,id)

//poner toastify 

  navigate('/dashboard')

  } catch (error) {
    console.log({error})
    
  }
 

}

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-500 mb-6">Editar Incidente</h1>

        <Select setValue={setStatus} value={status} options={optionsStatus}  title='Estado:'/>

        <Select setValue={setType} value={type} options={options} title='Elige el tipo de incidencia:'/>
          <div className="mt-6">
            <label className="block text-lg font-semibold mb-2">Descripción:</label>
            <input
              type="text"
              value={description}
              onChange={e=>setDescription(e.target.value)}
              className="w-full border border-gray-400 p-2 mb-4 rounded-lg"
              placeholder=""
            />
          </div>

          <div className="mt-2">
            <label className="block text-lg font-semibold mb-2">Locación:</label>
            <input
              type="text"
              value={location}
              onChange={e=>setLocation(e.target.value)}
              className="w-full border border-gray-400 p-2 mb-4 rounded-lg"
              placeholder=""
            />
          </div>

          <div className="mt-2">
            <label className="block text-lg font-semibold mb-2">Reportado por:</label>
            <input
              type="text"
              value={reportByUser}
              onChange={e=>setReportByUser(e.target.value)}
              className="w-full border border-gray-400 p-2 mb-4 rounded-lg"
              placeholder=""
            />
          </div>

          <button onClick={handleEnviar} className="bg-green-500 text-white rounded-lg py-2 px-4 w-full hover:bg-green-600 transition duration-300">
            Editar Incidencia
          </button>
       
      </div>
    </div>
  );
};

export default EditIncident;
