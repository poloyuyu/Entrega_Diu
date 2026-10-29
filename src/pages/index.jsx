import React from 'react'
import { Link } from 'react-router-dom'
import AppShell from '../components/app_shell'
import { useApp } from '../components/app_state'

const STEPS = ['Inscripción TT1', 'Validación de requisitos', 'Desarrollo TT2', 'Defensa de memoria']
const CURRENT_STEP = 2 // 1-indexed

const HomePage = () => {
  const { milestones, tramite, actualizado } = useApp()

  return (
    <AppShell
      title='Mi proceso de titulación'
      lead='Estado, responsable y fechas críticas en un solo lugar — sin depender del correo.'
    >
      <ol className='stepper'>
        {STEPS.map((label, i) => {
          const n = i + 1
          const state = n < CURRENT_STEP ? 'done' : n === CURRENT_STEP ? 'current' : ''
          return (
            <li key={label} className={`step ${state}`} aria-current={state === 'current' ? 'step' : undefined}>
              <div className='step-dot' />
              <div className='step-label'>{label}</div>
            </li>
          )
        })}
      </ol>

      <section className='pending'>
        <div>
          <div className='eyebrow'>Trámite pendiente</div>
          <div className='pending-title'>{tramite.titulo}</div>
        </div>
        <div>
          <div className='eyebrow'>Responsable actual</div>
          <div className='pending-title'>{tramite.responsable}</div>
        </div>
        <div className='pending-meta'>
          {tramite.meta} · Actualizado hoy a las {actualizado}
        </div>
      </section>

      <h2 className='h2'>Próximos hitos</h2>
      <ul className='milestones'>
        {milestones.map((m) => (
          <li key={m.id}>
            <Link to={m.to} className='milestone'>
              <span className={`badge ${m.tone}`}>{m.badge}</span>
              <div>
                <div className='milestone-title'>{m.title}</div>
                <div className='milestone-detail'>{m.detail}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <section className='faq'>
        <h2 className='h2'>¿Por qué está en pausa mi inscripción?</h2>
        <p>
          Para inscribir TT2 se requiere validar Práctica Profesional 2 y el nivel de inglés. Ambas
          validaciones se solicitan automáticamente al llegar al 80% de avance; no necesitas escribir a
          la Jefatura de Carrera para confirmarlo.
        </p>
      </section>
    </AppShell>
  )
}

export default HomePage