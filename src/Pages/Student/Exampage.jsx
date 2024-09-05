import React from 'react'
import ExamForm from '../../components/Student/ExamForm'
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

export default function Exampage() {
    return (
        <div className="h-screen flex">
            <Navbar className="w-1/4 bg-gray-800" />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header className="w-full bg-gray-200 shadow-md flex-shrink-0" />
                <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
                    <ExamForm className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8" />
                </div>
            </div>
        </div>
    )
}
