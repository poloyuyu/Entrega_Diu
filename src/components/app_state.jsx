import React, { createContext, useContext, useState } from 'react'

const AppState = createContext(null)
export const useApp = () => useContext(AppState)

const hoy = () =>
  new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })

const NOTIFS = [
  { id: 1, icon: '⏰', tone: 'warn', title: 'Tu informe final vence en 12 días',
    body: 'Fecha límite: 15 de noviembre de 2026. Revisa el formato exigido en Documentos.', time: 'Hoy, 08:00', read: false },
  { id: 2, icon: '✓', tone: 'ok', title: 'Tu validación de Práctica Profesional 2 fue recibida',
    body: 'Dirección de Estudios está revisándola. Tiempo estimado: 3–5 días hábiles.', time: 'Ayer, 17:40', read: false },
  { id: 3, icon: '+', tone: 'gold', title: 'Nuevo tema publicado en Ingeniería de Software',
    body: '"Panel de seguimiento para procesos académicos" — Prof. Raquel Pezoa.', time: 'Hace 2 días', read: false },
]

const DOCS = {
  examen: [
    { id: 'alumno', name: 'Certificado de alumno regular (matrícula vigente)', checked: true, side: 'Cargado 28-ago' },
    { id: 'ingles', name: 'Certificado de nivel de inglés de salida', checked: false, link: 'Ver instrucciones' },
    { id: 'memoria', name: 'Copia digital de la memoria (PDF)', checked: false, link: 'Descargar plantilla' },
  ],
  tt2: [
    { id: 'pp1', name: 'Aprobación de Práctica Profesional 1', checked: true, side: 'Validado', locked: true },
    { id: 'pp2', name: 'Aprobación de Práctica Profesional 2', checked: false, side: 'En revisión', locked: true },
  ],
}

export function AppProvider({ children }) {
  const [notifs, setNotifs] = useState(NOTIFS)
  const [docs, setDocs] = useState(DOCS)
  const [temasPedidos, setTemasPedidos] = useState([])
  const [solicitudes, setSolicitudes] = useState([
    { id: 1, tipo: 'Informe de avance (memoria)', archivo: 'avance_v3.pdf', fecha: '5 de septiembre de 2026', estado: 'En revisión' },
  ])

  const unread = notifs.filter((n) => !n.read).length
  const markRead = (id) => setNotifs((l) => l.map((n) => (n.id === id ? { ...n, read: true } : n)))
  const toggleDoc = (group, id) =>
    setDocs((d) => ({ ...d, [group]: d[group].map((x) => (x.id === id ? { ...x, checked: !x.checked } : x)) }))
  const pedirTema = (tema) => setTemasPedidos((l) => (l.find((t) => t.id === tema.id) ? l : [...l, tema]))
  const enviarSolicitud = ({ tipo, archivo }) =>
    setSolicitudes((l) => [{ id: Date.now(), tipo, archivo, fecha: hoy(), estado: 'Enviada' }, ...l])

  return (
    <AppState.Provider
      value={{ notifs, unread, markRead, docs, toggleDoc, temasPedidos, pedirTema, solicitudes, enviarSolicitud }}
    >
      {children}
    </AppState.Provider>
  )
}
