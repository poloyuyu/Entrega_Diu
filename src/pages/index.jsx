import React from 'react'
import AppShell from '../components/app_shell'

const STEPS = ['Inscripción TT1', 'Validación de requisitos', 'Desarrollo TT2', 'Defensa de memoria']
const CURRENT_STEP = 2 // 1-indexed

const MILESTONES = [
  { id: 1, badge: '12 días', tone: 'warn', title: 'Entrega de informe final', detail: 'Fecha límite: 15 de noviembre de 2026' },
  { id: 2, badge: 'Pendiente', tone: 'neutral', title: 'Certificado de inglés de salida', detail: 'Debes subirlo antes de solicitar examen de título' },
  { id: 3, badge: 'En curso', tone: 'ok', title: 'Validación de Práctica Profesional 2', detail: 'En revisión por Dirección de Estudios desde el 2 de septiembre' },
]

const HomePage = () => (
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
        <div className='pending-title'>Validación de Práctica Profesional 2</div>
      </div>
      <div>
        <div className='eyebrow'>Responsable actual</div>
        <div className='pending-title'>Dirección de Estudios</div>
      </div>
      <div className='pending-meta'>
        Tiempo estimado de respuesta: 3–5 días hábiles · Actualizado hoy a las 09:12
      </div>
    </section>

    <h2 className='h2'>Próximos hitos</h2>
    <ul className='milestones'>
      {MILESTONES.map((m) => (
        <li key={m.id} className='milestone'>
          <span className={`badge ${m.tone}`}>{m.badge}</span>
          <div>
            <div className='milestone-title'>{m.title}</div>
            <div className='milestone-detail'>{m.detail}</div>
          </div>
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

export default HomePage
