import React from 'react'
import { useNavigate } from 'react-router-dom'
import AppShell from '../components/app_shell'
import { useApp } from '../components/app_state'

const NotificacionesPage = () => {
  const { notifs, markRead } = useApp()
  const navigate = useNavigate()

  return (
    <AppShell
      title='Notificaciones'
      lead='Alertas proactivas sobre fechas críticas y cambios de estado, para no enterarte tarde.'
    >
      {notifs.map((n) => (
        <button
          key={n.id}
          className={`notif ${n.read ? 'read' : ''}`}
          onClick={() => {
            markRead(n.id)
            navigate(n.to)
          }}
        >
          <span className={`notif-icon ${n.tone}`}>{n.icon}</span>
          <span>
            <div className='notif-title'>{n.title}</div>
            <div className='notif-body'>{n.body}</div>
            <div className='notif-time'>{n.time}</div>
          </span>
        </button>
      ))}
    </AppShell>
  )
}

export default NotificacionesPage
