import React from 'react';
import Navbar from '../components/Navbar';  // Asegúrate de que la ruta sea correcta
import Header from '../components/Header';  // Asegúrate de que la ruta sea correcta

export default function MainLayout({ children }) {
    return (
        <div className="h-screen flex overflow-hidden">
            <Navbar className="w-1/4" />
            <div className="flex flex-1 flex-col">
                <Header className="w-full flex-shrink-0" />
                    {children}
            </div>
        </div>
    );
}
