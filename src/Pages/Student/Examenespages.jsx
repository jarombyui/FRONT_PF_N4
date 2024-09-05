import React, { useEffect, useState, useContext } from 'react';
import StudentCard from '../../components/Student/studentCard';
import MainLayout from '../../layouts/MainLayout';
import { getExamenesByCurso } from '../../services/DataService';
import { Authcontext } from '../../context/AuthContext';

export default function Examenespages() {
  const { dataUser, isLoading: isLoadingUser } = useContext(Authcontext);
  const [examenes, setExamenes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cursoUsuario, setCursoUsuario] = useState(null);

  useEffect(() => {
    const fetchExamenes = async () => {
      if (dataUser?.data && dataUser?.data?.cursos && dataUser?.data?.cursos?.length > 0) {
        const cursoUsuario = dataUser?.data?.cursos[0];
        setCursoUsuario(cursoUsuario);
        const token = localStorage.getItem('token');

        try {
          const examenesData = await getExamenesByCurso(cursoUsuario._id, token);
          setExamenes(examenesData);
        } catch (error) {
          console.error('Error al obtener los exámenes:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchExamenes();
  }, [dataUser]);

  if (isLoading || isLoadingUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Cargando...</div>
      </div>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-4xl font-bold text-center my-8 text-gray-800">Exámenes</h1>
      <section className="max-w-[1200px] m-auto grid grid-cols-3 gap-6">
        {examenes.map((examen, index) => (
          <StudentCard
            key={examen._id}
            examenId={examen._id}
            calificacionMinima={examen.calificacionMinima}
            cursoUsuario={cursoUsuario}
            index={index + 1}
          />
        ))}
      </section>
    </MainLayout>
  );
}
