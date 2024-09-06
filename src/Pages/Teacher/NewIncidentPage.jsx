import React from 'react'
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import CreateIncident from '../../components/Teacher/CreateIncident';

export default function NewIncidentPage() {
    return (
        <div className="h-screen flex overflow-hidden">
            <Navbar className="w-1/4" />
            <div className="flex flex-1 flex-col">
                <Header className="w-full flex-shrink-0" />
                <CreateIncident/>
            </div>
        </div>
    )
}
