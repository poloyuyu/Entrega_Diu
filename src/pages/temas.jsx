import React, { useMemo, useState } from 'react'
import AppShell from '../components/app_shell'
import { useApp } from '../components/app_state'

const TEMAS = [
  { id: 1, titulo: 'Desarrollo de sistema de trazabilidad académica', profesor: 'Pedro Godoy', area: 'Ingeniería de Software', usados: 1, total: 2, act: 'hace 2 días' },
  { id: 2, titulo: 'Automatización de procesos financieros mediante IA', profesor: 'Raquel Pezoa', area: 'Inteligencia Artificial', usados: 0, total: 2, act: 'hace 5 días' },
  { id: 3, titulo: 'Detección de anomalías en tráfico de red universitario', profesor: 'Marcia Muñoz', area: 'Ciberseguridad', usados: 2, total: 3, act: 'hoy' },
  { id: 4, titulo: 'Panel de seguimiento para procesos académicos', profesor: 'Raquel Pezoa', area: 'Ingeniería de Software', usados: 1, total: 1, act: 'hace 1 día' },
]
const AREAS = [...new Set(TEMAS.map((t) => t.area))]

const TemasPage = () => {
  const { temasPedidos, pedirTema } = useApp()
  const [q, setQ] = useState('')
  const [area, setArea] = useState('')

  const lista = useMemo(() => {
    const s = q.trim().toLowerCase()
    return TEMAS.filter(
      (t) =>
        (!area || t.area === area) &&
        (!s || t.titulo.toLowerCase().includes(s) || t.profesor.toLowerCase().includes(s))
    )
  }, [q, area])

  return (
    <AppShell
      title='Temas disponibles'
      lead='Catálogo único y actualizado — reemplaza tener que escribir a cada profesor para saber si hay cupo.'
    >
      <div className='filters'>
        <input className='input' placeholder='Buscar por título o profesor guía…' value={q} onChange={(e) => setQ(e.target.value)} />
        <select className='select' value={area} onChange={(e) => setArea(e.target.value)}>
          <option value=''>Todas las áreas</option>
          {AREAS.map((a) => <option key={a}>{a}</option>)}
        </select>
      </div>

      {lista.map((t) => {
        const sinCupos = t.usados >= t.total
        const pedido = temasPedidos.some((p) => p.id === t.id)
        return (
          <article key={t.id} className='tema'>
            <div>
              <h3>{t.titulo}</h3>
              <div className='prof'>Profesor guía: {t.profesor}</div>
              <div className='chips'>
                <span className='chip neutral'>{t.area}</span>
                <span className={`chip ${sinCupos ? 'warn' : 'neutral'}`}>Cupos: {t.usados}/{t.total}</span>
                <span className='chip ok'>Actualizado {t.act}</span>
              </div>
            </div>
            <button className='btn' disabled={sinCupos || pedido} onClick={() => pedirTema(t)}>
              {sinCupos ? 'Sin cupos' : pedido ? 'Solicitado' : 'Solicitar tema'}
            </button>
          </article>
        )
      })}
      {lista.length === 0 && <p className='muted'>No hay temas que coincidan con tu búsqueda.</p>}

      <h2 className='h2' style={{ marginTop: 32, fontSize: 15 }}>Mis solicitudes</h2>
      {temasPedidos.length === 0 ? (
        <p className='muted'>Aún no has solicitado ningún tema.</p>
      ) : (
        temasPedidos.map((t) => (
          <div key={t.id} className='req'>
            <div>
              <div className='req-title'>{t.titulo}</div>
              <div className='hint'>Prof. {t.profesor}</div>
            </div>
            <span className='chip gold'>Pendiente</span>
          </div>
        ))
      )}
    </AppShell>
  )
}

export default TemasPage
