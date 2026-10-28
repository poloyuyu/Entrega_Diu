import React from 'react'
import AppShell from '../components/app_shell'
import { useApp } from '../components/app_state'

const GRUPOS = [
  { key: 'examen', titulo: 'Para el examen de título' },
  { key: 'tt2', titulo: 'Para inscribir TT2' },
]

const DocumentosPage = () => {
  const { docs, toggleDoc } = useApp()

  return (
    <AppShell
      title='Documentos requeridos'
      lead='Todo lo que necesitas para el examen de título, con su plantilla y estado, en un solo lugar.'
    >
      {GRUPOS.map((g) => (
        <section key={g.key} className='doc-group'>
          <h2 className='h2' style={{ fontSize: 16, marginBottom: 8 }}>{g.titulo}</h2>
          {docs[g.key].map((d) => (
            <label key={d.id} className={`doc ${d.checked ? 'checked' : ''}`}>
              <input type='checkbox' checked={d.checked} disabled={d.locked} onChange={() => toggleDoc(g.key, d.id)} />
              <span className='doc-name'>{d.name}</span>
              <span className='doc-side'>
                {d.checked && d.side ? d.side : d.link ? <a href='#' onClick={(e) => e.preventDefault()}>{d.link}</a> : d.side}
              </span>
            </label>
          ))}
        </section>
      ))}
    </AppShell>
  )
}

export default DocumentosPage
