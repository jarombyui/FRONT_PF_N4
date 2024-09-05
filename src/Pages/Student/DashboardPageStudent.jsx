import React, { useContext } from 'react';
import { Authcontext } from '../../context/AuthContext';
import Fotocheck from '../../components/Fotocheck';
import MainLayout from '../../layouts/MainLayout';

export default function DashboardPageStudent() {
  const { options, modal, login, dataUser } = useContext(Authcontext);

  const nombres = dataUser?.data?.nombres;

  return (
    <MainLayout>
      <main className="flex flex-1 flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Bienvenido, {nombres || 'Estudiante'}
        </h1>
        <Fotocheck
          data={dataUser?.data}
        />
        {modal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg">
              {/* Contenido del modal */}
              <button onClick={options} className="bg-red-500 text-white rounded-lg py-2 px-4">
                Cerrar Modal
              </button>
            </div>
          </div>
        )}
      </main>
    </MainLayout>
  );
}
