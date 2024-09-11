import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContex';

export const Report = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { createReport } = useContext(AdminContext);
    const usuario_id = localStorage.getItem('userId');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        const formData = new FormData(e.target);
        formData.append("usuario_id", usuario_id)

        formData.append("estado", "en_proceso")
        
        // const reportData = {
        //     usuario_id: parseInt(usuario_id), 
        //     asunto: formData.get('asunto'),
        //     descripcion: formData.get('descripcion'),
        //     tipo: formData.get('tipo'),
        //     estado: 'en_proceso'
        // };

        try {
            await createReport.mutateAsync(formData);
            e.target.reset();
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            console.error('Error al enviar el reporte:', error);
            setError('No se pudo enviar el reporte. Inténtelo de nuevo.');
        }
    };

    return (
        <div className='container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>Nuevo reporte</h2>
            <p className='text-lg text-gray-600 mb-6'>Complete el formulario a continuación para reportar un problema.</p>
            {success && (
                <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4' role="alert">
                    <strong className="font-bold">¡Éxito! </strong>
                    <span className="block sm:inline">El reporte se ha enviado correctamente.</span>
                </div>
            )}
            <form
                className='bg-white p-6 rounded-lg shadow-md space-y-6'
                onSubmit={handleSubmit}
            >
                <div className='flex flex-col space-y-2'>
                    <label className='flex flex-col'>
                        <span className='text-sm font-medium text-gray-700'>Asunto:</span>
                        <input
                            required
                            placeholder='Ingrese el título del problema'
                            className='mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500'
                            type="text"
                            name='asunto'
                        />
                    </label>
                </div>
                <div className='flex flex-col space-y-2'>
                    <label className='flex flex-col'>
                        <span className='text-sm font-medium text-gray-700'>Descripción:</span>
                        <textarea
                            required
                            placeholder='Proporcione una breve descripción'
                            className='mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500'
                            name='descripcion'
                        />
                    </label>
                </div>
                <div className='flex flex-col space-y-2'>
                    <label className='flex flex-col'>
                        <span className='text-sm font-medium text-gray-700'>Tipo:</span>
                        <select
                            required
                            className='mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500'
                            name='tipo'
                        >
                            <option value="fontaneria">Fontanería</option>
                            <option value="electricidad">Electricidad</option>
                            <option value="limpieza">Limpieza</option>
                            <option value="otros">Otros</option>
                        </select>
                    </label>
                </div>
                <input className='' id='photo' name='photo' type="file" />
                {error && <p className='text-red-500 text-sm'>{error}</p>}
                <button 
                    className='w-full py-2 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    type='submit'
                    disabled={createReport.isLoading}
                >
                    {createReport.isLoading ? 'Enviando...' : 'Enviar Reporte'}
                </button>
            </form>
        </div>
    );
};