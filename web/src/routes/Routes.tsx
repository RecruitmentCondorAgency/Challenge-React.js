import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'



export default function Routes() {
    return (
        <Router>
        <div>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Dashboard />} exact />
            <Route path="/login" element={<Dashboard />} exact />
            {/* USUARIOS ROUTES */}
            <Route path="/usuarios" element={<Usuarios />} exact />
            <Route path="/usuarios/crear" element={<CreateUser />} exact />
            <Route path="/usuarios/:id/editar" element={<EditUser />} exact />

            <Route path="/permisos" element={<Permisos />} exact />
            <Route path="/roles" element={<Roles />} exact />
            <Route path="/roles/:clave_usuario/editar" element={<RolUser />} exact />

            
            <Route path="/edit" element={<Dashboard />} exact />
            
            <Route path="/profile" element={<Dashboard />} exact />
            <Route path="*" element={<Error404/>} />
        </Routes>
        </div>
    </Router>
    )
}
