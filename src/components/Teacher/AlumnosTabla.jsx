import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getReports } from '../../services/DataService';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function AlumnosTabla() {

  const [rows,setRows]=useState([])

  const navigate = useNavigate()

  const getData=async()=>{
    try {
      const data = await getReports()
      setRows(data)
    } catch (error) {
      setRows([])
    }
   
   }
  useEffect(() => {
   getData()
  }, [])


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Alumnos</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="center">Tipo</TableCell>
              <TableCell align="center">Decripción</TableCell>
              <TableCell align="center">Locación</TableCell>
              <TableCell align="center">Reporttado por</TableCell>
              <TableCell align="center">Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.id_incident}
                </TableCell>
                <TableCell align="center">{row?.incident_type}</TableCell>
                <TableCell align="center">{row?.descripcion}</TableCell>
                <TableCell align="center">{row?.location}</TableCell>
                <TableCell align="center">{row?.reported_by}</TableCell>
                <TableCell align="center">  <button onClick={()=>navigate(`/reportes/${row?.id_incident}`)} className="bg-green-500 text-white rounded-lg py-2 px-4 w-full hover:bg-green-600 transition duration-300">
            Editar
          </button></TableCell>

                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
