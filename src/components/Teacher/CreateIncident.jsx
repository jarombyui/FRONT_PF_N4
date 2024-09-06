import React, { useState } from 'react';
import Select from '../Select';
import { sendIncident } from '../../services/DataService';
import { useNavigate } from "react-router-dom";

const options = ['Robo','Falla eléctrica','Falla de agua','Falla de gas','Vidrios rotos']

const CreateIncident = () => {

  const [type,setType]=useState('')
  const [description,setDescription]=useState('')
  const [location,setLocation]=useState('')
  const [reportByUser,setReportByUser]=useState('')

  const navigate = useNavigate();
const handleEnviar =async() =>{

  try {
    const dataProps= {
      "incident_type": type,
      "descripcion": description,
      "location": location,
      "reported_by": reportByUser,
  }
  await sendIncident(dataProps)

//poner toastify 

  navigate('/dashboard')



  } catch (error) {
    console.log({error})
    
  }

 

}

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">Crear Incidente</h1>

        <Select setValue={setType} value={type} options={options} />
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

          <button onClick={handleEnviar} className="bg-orange-300 text-white rounded-lg py-2 px-4 w-full hover:bg-green-600 transition duration-300">
            Editar Incidencia
          </button>
       
      </div>
    </div>
  );
};

export default CreateIncident;
