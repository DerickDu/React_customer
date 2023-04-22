import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


export default function ProtectedRoute() {
    let isAuth = localStorage.getItem('login')
    return (
        isAuth != true ? <Navigate to="/login" /> : <Outlet />
    )
}
