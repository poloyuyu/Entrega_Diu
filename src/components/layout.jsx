import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import HomePage from '../pages/index.jsx'
import TemasPage from '../pages/temas'
import SolicitudesPage from '../pages/solicitudes'
import NotificacionesPage from '../pages/notificaciones'
import DocumentosPage from '../pages/documentos'
import LightbulbPage from '../pages/lightbulb_page.jsx'

import { AppProvider } from '../components/app_state'

const Layout = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className='layout'>
          <div className='layout__page'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/temas' element={<TemasPage />} />
              <Route path='/solicitudes' element={<SolicitudesPage />} />
              <Route path='/notificaciones' element={<NotificacionesPage />} />
              <Route path='/documentos' element={<DocumentosPage />} />
              <Route path='/lightbulb' element={<LightbulbPage />} />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          </div>
        </div>
      </AppProvider>
    </BrowserRouter>
  )
}

export default Layout
