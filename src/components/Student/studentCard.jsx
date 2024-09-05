import React, { useContext } from 'react'; // Importar useContext
import { Link } from 'react-router-dom';
import { Authcontext } from '../../context/AuthContext';

const StudentCard = ({ examenId, calificacionMinima, cursoUsuario, index }) => {
    const { dataUser } = useContext(Authcontext);

    if (!dataUser?.data) {
        return null; // No renderiza nada si no hay datos de usuario
    }

    return (
        <Link to={`/examenes/${examenId}`}>
            <div className="p-4">
                <div className="grid gap-4">
                    <div key={examenId} className="max-w-xs p-4 bg-white border-4 border-blue-400 rounded-xl shadow-md">
                        {dataUser?.role === 'user' && (
                            <>
                                <h2 className="text-orange-500 text-xl font-bold mb-2 text-center">
                                    {cursoUsuario?.nombre?.toUpperCase()}
                                </h2>
                                <p className="text-gray-700 text-sm text-center">Exam: {index}</p>
                                <p className='text-sm'>Calificación mínima: {calificacionMinima}</p>
                            </>
                        )}

                        {dataUser?.role === 'admin' && (
                            <div className='justify-content-center'>
                                <h2 className="text-blue-500 text-2xl font-bold mb-2 text-center">
                                    {cursoUsuario?.nombre?.toUpperCase()}
                                </h2>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default StudentCard;
