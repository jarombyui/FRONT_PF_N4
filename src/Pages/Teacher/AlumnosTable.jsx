import React from 'react';
import AlumnosTabla from '../../components/Teacher/AlumnosTabla';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

export default function AlumnosTable() {
  return (
    <div className="h-screen flex overflow-hidden">
      <Navbar className="w-1/4 bg-gray-800 text-white" />
      <div className="flex flex-1 flex-col">
        <Header className="w-full flex-shrink-0 bg-gray-200" />
        <div className="flex-1 p-4 overflow-auto">
          <AlumnosTabla />
        </div>
      </div>
    </div>
  );
}
