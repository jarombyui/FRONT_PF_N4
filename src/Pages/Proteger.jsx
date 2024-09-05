
import React, { useContext } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Authcontext } from '../context/AuthContext';

function Proteger() {
    const navigate = useNavigate();
    const { isLoading, isError } = useContext(Authcontext)
    const token = localStorage.getItem('token')

    if (!token) {
      window.location.href = '/login'
        return null
    }
    if (isLoading) {
        return <div>Loading info...</div>
    }

    if (isError) {
        return <Navigate to={'/login'} />
    }
    return <Outlet />


}

export default Proteger;
