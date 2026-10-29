import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const AppState = createContext(null)
export const useApp = () => useContext(AppState)

const STORAGE_KEY = 'sgm_state_v1'
const EVENTS_KEY = 'sgm_events_v1'

// Fecha límite del informe final (se calcula el "faltan X días" a partir de hoy)
export const DEADLINE = new Date(2026, 10, 15)
export const diasHasta = (fecha) => {
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)
  return Math.round((fecha - hoy) / 86400000)
}

// Tiempos de la simulación de respuesta de Dirección de Estudios (ms desde el envío)
const T_REVISION = 6000
const T_RESPUESTA = 18000

const fechaHoy = () =>
  new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })
const horaAhora = () =>
  'Hoy, ' + new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })

const TIPO_INGLES = 'Certificado de inglés de salida'
const TIPO_FINAL = 'Informe final (memoria)'
const TIPO_PRACTICA = 'Validación de práctica profesional'

const INITIAL = {
  notifs: [
    { id: 1, dyn: 'deadline', icon: '⏰', tone: 'warn', title: '', to: '/solicitudes?tipo=final',
      body: 'Fecha límite: 15 de noviembre de 2026. Revisa el formato exigido en Documentos.', time: 'Hoy, 08:00', read: false },
    { id: 2, icon: '✓', tone: 'ok', title: 'Tu validación de Práctica Profesional 2 fue recibida', to: '/documentos',
      body: 'Dirección de Estudios está revisándola. Tiempo estimado: 3–5 días hábiles.', time: 'Ayer, 17:40', read: false },
    { id: 3, icon: '+', tone: 'gold', title: 'Nuevo tema publicado en Ingeniería de Software', to: '/temas',
      body: '"Panel de seguimiento para procesos académicos" — Prof. Raquel Pezoa.', time: 'Hace 2 días', read: false },
  ],
  docs: {
    examen: [
      { id: 'alumno', name: 'Certificado de alumno regular (matrícula vigente)', checked: true, side: 'Cargado 28-ago' },
      { id: 'ingles', name: 'Certificado de nivel de inglés de salida', checked: false, link: 'Ver instrucciones' },
      { id: 'memoria', name: 'Copia digital de la memoria (PDF)', checked: false, link: 'Descargar plantilla' },
    ],
    tt2: [
      { id: 'pp1', name: 'Aprobación de Práctica Profesional 1', checked: true, side: 'Validado', locked: true },
      { id: 'pp2', name: 'Aprobación de Práctica Profesional 2', checked: false, side: 'En revisión', locked: true },
    ],
  },
  temasPedidos: [],
  solicitudes: [
    { id: 1, tipo: 'Informe de avance (memoria)', archivo: 'avance_v3.pdf', fecha: '5 de septiembre de 2026', estado: 'En revisión', stage: 2 },
  ],
}

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...INITIAL, ...JSON.parse(raw) } : INITIAL
  } catch (e) {
    return INITIAL
  }
}

// stage: 0 = Enviada, 1 = En revisión, 2 = (respuesta). Para "avance" la respuesta es "En revisión" (el profesor aún revisa).
const ESTADOS_FINALES = { [TIPO_INGLES]: 'Aprobada', [TIPO_PRACTICA]: 'Aprobada', [TIPO_FINAL]: 'Recibida' }

export function AppProvider({ children }) {
  const [state, setState] = useState(load)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  const { notifs, docs, temasPedidos, solicitudes } = state

  // Persistencia: lo que dice el footer ahora es cierto
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch (e) { /* ignorar */ }
  }, [state])

  const logEvent = useCallback((evento, detalle) => {
    try {
      const log = JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]')
      log.push({ evento, detalle: detalle || null, t: new Date().toISOString() })
      localStorage.setItem(EVENTS_KEY, JSON.stringify(log))
    } catch (e) { /* ignorar */ }
  }, [])

  const showToast = useCallback((msg) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 4200)
  }, [])

  const addNotif = (s, n) => ({
    ...s,
    updatedAt: Date.now(),
    notifs: [{ id: Date.now() + Math.random(), read: false, time: horaAhora(), ...n }, ...s.notifs],
  })

  // Notificaciones con título dinámico (días restantes)
  const dias = diasHasta(DEADLINE)
  const notifsView = notifs.map((n) =>
    n.dyn === 'deadline'
      ? { ...n, title: dias > 0 ? `Tu informe final vence en ${dias} ${dias === 1 ? 'día' : 'días'}` : dias === 0 ? 'Tu informe final vence hoy' : 'El plazo del informe final ya venció' }
      : n
  )
  const unread = notifsView.filter((n) => !n.read).length

  const markRead = (id) => {
    setState((s) => ({ ...s, notifs: s.notifs.map((n) => (n.id === id ? { ...n, read: true } : n)) }))
    logEvent('notificacion_leida', id)
  }
  const markAllRead = () => {
    setState((s) => ({ ...s, notifs: s.notifs.map((n) => ({ ...n, read: true })) }))
    logEvent('notificaciones_todas_leidas')
  }

  const toggleDoc = (group, id) =>
    setState((s) => ({
      ...s,
      docs: { ...s.docs, [group]: s.docs[group].map((x) => (x.id === id ? { ...x, checked: !x.checked } : x)) },
    }))

  const setDoc = (s, group, id, patch) => ({
    ...s,
    docs: { ...s.docs, [group]: s.docs[group].map((x) => (x.id === id ? { ...x, ...patch } : x)) },
  })

  const pedirTema = (tema) => {
    if (temasPedidos.find((t) => t.id === tema.id)) return
    setState((s) =>
      addNotif({ ...s, temasPedidos: [...s.temasPedidos, tema] }, {
        icon: '+', tone: 'gold', to: '/temas',
        title: `Solicitaste el tema "${tema.titulo}"`,
        body: `Se notificó al Prof. ${tema.profesor}. Respuesta estimada: 3–5 días hábiles.`,
      })
    )
    showToast(`Solicitud enviada al Prof. ${tema.profesor}. Te avisaremos su respuesta.`)
    logEvent('tema_solicitado', tema.id)
  }

  const enviarSolicitud = ({ tipo, archivo, comentario }) => {
    const sol = { id: Date.now(), tipo, archivo, comentario, fecha: fechaHoy(), estado: 'Enviada', stage: 0, ts: Date.now() }
    setState((s) => {
      let next = { ...s, solicitudes: [sol, ...s.solicitudes] }
      if (tipo === TIPO_INGLES) next = setDoc(next, 'examen', 'ingles', { checked: true, locked: true, lockedMsg: 'Este estado lo actualiza Dirección de Estudios', side: 'Enviado · en revisión' })
      if (tipo === TIPO_FINAL) next = setDoc(next, 'examen', 'memoria', { checked: true, locked: true, lockedMsg: 'Se marcó al enviar tu informe final desde Solicitudes', side: 'Enviado · en revisión' })
      return addNotif(next, {
        icon: '✓', tone: 'ok', to: '/solicitudes',
        title: `Recibimos tu solicitud: ${tipo}`,
        body: `Archivo ${archivo}. Dirección de Estudios la revisará en 3–5 días hábiles.`,
      })
    })
    showToast('Solicitud enviada correctamente. Puedes seguir su estado en "Mis solicitudes".')
    logEvent('solicitud_enviada', tipo)
  }

  // Simula la respuesta de Dirección de Estudios (funciona también tras recargar la página)
  useEffect(() => {
    const id = setInterval(() => {
      setState((s) => {
        let next = s
        let changed = false
        s.solicitudes.forEach((sol) => {
          if (!sol.ts || sol.stage >= 2) return
          const t = Date.now() - sol.ts
          const stage = t >= T_RESPUESTA ? 2 : t >= T_REVISION ? 1 : 0
          if (stage === sol.stage) return
          changed = true
          const final = ESTADOS_FINALES[sol.tipo]
          const estado = stage === 1 ? 'En revisión' : final || 'En revisión'
          next = { ...next, solicitudes: next.solicitudes.map((x) => (x.id === sol.id ? { ...x, stage, estado } : x)) }
          if (stage === 1) {
            next = addNotif(next, { icon: '⏳', tone: 'gold', to: '/solicitudes', title: `Tu solicitud pasó a revisión: ${sol.tipo}`, body: 'Un funcionario de Dirección de Estudios la está revisando.' })
          } else if (final) {
            next = addNotif(next, { icon: '✓', tone: 'ok', to: sol.tipo === TIPO_INGLES ? '/documentos' : '/solicitudes', title: `${final === 'Aprobada' ? 'Aprobaron' : 'Registraron'} tu solicitud: ${sol.tipo}`, body: final === 'Aprobada' ? 'Tu avance quedó actualizado en el sistema.' : 'Quedó registrada como entrega oficial.' })
            if (sol.tipo === TIPO_INGLES) next = setDoc(next, 'examen', 'ingles', { checked: true, side: 'Validado' })
            if (sol.tipo === TIPO_PRACTICA) next = setDoc(next, 'tt2', 'pp2', { checked: true, side: 'Validado' })
            if (sol.tipo === TIPO_FINAL) next = setDoc(next, 'examen', 'memoria', { side: 'Recibido oficialmente' })
          }
        })
        return changed ? next : s
      })
    }, 1500)
    return () => clearInterval(id)
  }, [])

  // Hitos del Home derivados del estado real (ya no están hardcodeados)
  const ultima = (tipo) => solicitudes.find((x) => x.tipo === tipo)
  const sIngles = ultima(TIPO_INGLES)
  const sFinal = ultima(TIPO_FINAL)
  const pp2 = docs.tt2.find((d) => d.id === 'pp2')

  const milestones = [
    sFinal
      ? { id: 1, badge: sFinal.estado, tone: sFinal.estado === 'Recibida' ? 'ok' : 'gold', title: 'Entrega de informe final', detail: `Enviado el ${sFinal.fecha} (${sFinal.archivo})`, to: '/solicitudes' }
      : { id: 1, badge: dias >= 0 ? `${dias} ${dias === 1 ? 'día' : 'días'}` : 'Vencido', tone: 'warn', title: 'Entrega de informe final', detail: 'Fecha límite: 15 de noviembre de 2026', to: '/solicitudes?tipo=final' },
    sIngles
      ? { id: 2, badge: sIngles.estado, tone: sIngles.estado === 'Aprobada' ? 'ok' : 'gold', title: 'Certificado de inglés de salida', detail: sIngles.estado === 'Aprobada' ? 'Validado por Dirección de Estudios' : `Enviado el ${sIngles.fecha}, en revisión`, to: '/documentos' }
      : { id: 2, badge: 'Pendiente', tone: 'neutral', title: 'Certificado de inglés de salida', detail: 'Debes subirlo antes de solicitar examen de título', to: '/solicitudes?tipo=ingles' },
    pp2.checked
      ? { id: 3, badge: 'Validada', tone: 'ok', title: 'Validación de Práctica Profesional 2', detail: 'Aprobada por Dirección de Estudios', to: '/documentos' }
      : { id: 3, badge: 'En curso', tone: 'ok', title: 'Validación de Práctica Profesional 2', detail: 'En revisión por Dirección de Estudios desde el 2 de septiembre', to: '/documentos' },
  ]

  const enCurso = solicitudes.find((x) => x.ts && x.stage < 2)
  const ingles = docs.examen.find((d) => d.id === 'ingles')
  const tramite = enCurso
    ? { titulo: enCurso.tipo, responsable: 'Dirección de Estudios', meta: 'Tiempo estimado de respuesta: 3–5 días hábiles' }
    : !pp2.checked
      ? { titulo: 'Validación de Práctica Profesional 2', responsable: 'Dirección de Estudios', meta: 'Tiempo estimado de respuesta: 3–5 días hábiles' }
      : !ingles.checked
        ? { titulo: 'Subir certificado de inglés de salida', responsable: 'Tú', meta: 'Súbelo desde Solicitudes para poder pedir el examen de título' }
        : { titulo: 'Sin trámites pendientes', responsable: '—', meta: 'Todo al día' }
  const actualizado = state.updatedAt
    ? new Date(state.updatedAt).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })
    : '09:12'

  const resetDemo = () => {
    try { localStorage.removeItem(STORAGE_KEY) } catch (e) { /* ignorar */ }
    setState(INITIAL)
    logEvent('demo_reiniciada')
    showToast('Demo reiniciada.')
  }

  return (
    <AppState.Provider
      value={{
        notifs: notifsView, unread, markRead, markAllRead,
        docs, toggleDoc, temasPedidos, pedirTema,
        solicitudes, enviarSolicitud, milestones, dias, tramite, actualizado,
        toast, showToast, logEvent, resetDemo,
      }}
    >
      {children}
    </AppState.Provider>
  )
}
