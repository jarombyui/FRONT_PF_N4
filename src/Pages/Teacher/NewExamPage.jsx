import React from 'react'
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import CreateExam from '../../components/Teacher/createExam';

export default function NewExamPage() {
    return (
        <div className="h-screen flex overflow-hidden">
            <Navbar className="w-1/4" />
            <div className="flex flex-1 flex-col">
                <Header className="w-full flex-shrink-0" />
                <CreateExam/>
            </div>
        </div>
    )
}
