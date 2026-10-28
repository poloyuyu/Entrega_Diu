import React from 'react'
import { NavLink } from 'react-router-dom'
import css from './sgm_styles'
import { useApp } from './app_state'

const NAV = [
  { to: '/', label: 'Mi proceso', end: true },
  { to: '/temas', label: 'Temas disponibles' },
  { to: '/solicitudes', label: 'Solicitudes' },
  { to: '/notificaciones', label: 'Notificaciones', badge: true },
  { to: '/documentos', label: 'Documentos' },
]

export default function AppShell({ title, lead, children }) {
  const { unread } = useApp()

  return (
    <>
      <style>{css}</style>
      <div className='sgm'>
        <aside className='sgm-side'>
          <div>
            <div className='sgm-brand'>SGM</div>
            <div className='sgm-brand-sub'>UTFSM · Informática</div>
          </div>

          <div className='sgm-user'>
            <div className='sgm-user-name'>Mohammed A.</div>
            <div className='sgm-user-meta'>
              Memorista · Ing. Civil<br />Informática
            </div>
          </div>

          <nav className='sgm-nav' aria-label='Navegación principal'>
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {item.label}
                {item.badge && unread > 0 ? <span className='count'>{unread}</span> : null}
              </NavLink>
            ))}
          </nav>

          <div className='sgm-side-foot'>
            Sesión guardada automáticamente. No se pierde avance al navegar.
          </div>
          <div className='sgm-flag' aria-hidden='true'>
            <span style={{ background: '#d7263d' }} />
            <span style={{ background: '#f4b400' }} />
            <span style={{ background: '#1d3f8f' }} />
          </div>
        </aside>

        <main className='sgm-main'>
          <div className='sgm-wrap'>
            <h1 className='sgm-h1'>{title}</h1>
            <p className='sgm-lead'>{lead}</p>
            <hr className='sgm-rule' />
            {children}
          </div>
        </main>
      </div>
    </>
  )
}
