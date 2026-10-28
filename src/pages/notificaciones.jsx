import React from 'react'
import AppShell from '../components/app_shell'
import { useApp } from '../components/app_state'

const NotificacionesPage = () => {
  const { notifs, markRead } = useApp()

  return (
    <AppShell
      title='Notificaciones'
      lead='Alertas proactivas sobre fechas críticas y cambios de estado, para no enterarte tarde.'
    >
      {notifs.map((n) => (
        <button key={n.id} className={`notif ${n.read ? 'read' : ''}`} onClick={() => markRead(n.id)}>
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
