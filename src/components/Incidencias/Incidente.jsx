import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContex';
import { Link } from 'wouter';
import dayjs from 'dayjs';

export const Incident = () => {
    const { reportFrUs, delReport } = useContext(AdminContext);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        if (reportFrUs) setReports(reportFrUs);
    }, [reportFrUs]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        let filteredReports = [...reportFrUs];

        if (name === 'status') {
            filteredReports = value ? filteredReports.filter(rp => rp.status === value) : filteredReports;
        } else if (name === 'desde') {
            const fechaDesde = dayjs(value).startOf('day');
            filteredReports = filteredReports.filter(rp => dayjs(rp.date).isSameOrAfter(fechaDesde));
        } else if (name === 'hasta') {
            const fechaHasta = dayjs(value).endOf('day');
            filteredReports = filteredReports.filter(rp => dayjs(rp.date).isSameOrBefore(fechaHasta));
        }

        setReports(filteredReports);
    };

    const handleUpdate = (id) => {
        localStorage.setItem('idIn', id);
    };

    const handleDelete = async (id) => {
        await delReport.mutateAsync(id);
    };

    return (
        <section className='w-full h-screen flex flex-col gap-4 bg-blue-50 p-4'>
            <header className='w-full flex flex-col gap-4 sm:flex-row items-center justify-between mb-4'>
                <h2 className='text-2xl font-bold text-blue-800'>Mis incidencias </h2>
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
                    <label className='text-blue-600 flex items-center gap-2'>
                        Estado:
                        <select
                            name='status'
                            className='rounded-xl border border-blue-300 p-2 outline-none text-black'
                            onChange={handleFilterChange}
                        >
                            <option value="">Todos</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="progreso">Progreso</option>
                            <option value="resuelto">Resuelto</option>
                        </select>
                    </label>
                    {/* <label className='text-blue-600 flex items-center gap-2'>
                        Fecha:
                        Desde
                        <input
                            name='desde'
                            className='text-black px-2 border border-blue-300 rounded-md'
                            type="date"
                            onChange={handleFilterChange}
                        />
                        Hasta
                        <input
                            name='hasta'
                            className='text-black px-2 border border-blue-300 rounded-md'
                            type="date"
                            onChange={handleFilterChange}
                        />
                    </label> */}
                </div>
            </header>
            <section className="overflow-x-auto w-full">
                <table className="min-w-full bg-white bg-opacity-90 border border-purple-200 rounded-md">
                    <thead>
                        <tr className="bg-blue-100 border-b border-blue-300">
                            <th className="py-2 px-4 text-center text-blue-600">Asunto</th>
                            <th className="py-2 px-4 text-center text-orange-400">Descripción</th>
                            <th className="py-2 px-4 text-center text-green-600">Tipo</th>
                            <th className="py-2 px-4 text-center text-purple-600">Estado</th>
                            <th className="py-2 px-4 text-center text-red-700">Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((item) => (
                            <tr key={item.id} className="relative text-black border-b border-blue-300 hover:bg-blue-50 transition-colors">
                                <td className="py-2 px-4 text-center">{item.asunto}</td>
                                <td className="py-2 px-4 text-center">{item.descripcion}</td>
                                <td className="py-2 px-4 text-center">{item.tipo}</td>
                                <td className="py-2 px-4 text-center">{item.estado}</td>
                                <td className="py-2 px-4 text-center flex justify-center gap-2">
                                    <button
                                        className="text-blue-500 cursor-pointer hover:underline"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </section>
    );
};
