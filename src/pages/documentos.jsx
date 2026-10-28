import React, { useState } from 'react'
import AppShell from '../components/app_shell'
import { useApp } from '../components/app_state'

const GRUPOS = [
  { key: 'examen', titulo: 'Para el examen de título' },
  { key: 'tt2', titulo: 'Para inscribir TT2' },
]

const INSTRUCCIONES = 'Sube el certificado emitido por el Departamento de Lenguas (nivel B1 o superior) en formato PDF desde la sección Solicitudes, eligiendo "Certificado de inglés de salida".'

const PLANTILLA = 'Plantilla de memoria - UTFSM Ingeniería Civil Informática\n\n1. Portada\n2. Resumen / Abstract\n3. Introducción\n4. Marco teórico\n5. Desarrollo\n6. Resultados\n7. Conclusiones\n8. Referencias\n'

const DocumentosPage = () => {
  const { docs, toggleDoc } = useApp()
  const [verInstrucciones, setVerInstrucciones] = useState(false)

  const renderLink = (d) => {
    if (d.id === 'memoria') {
      return <a href={'data:text/plain;charset=utf-8,' + encodeURIComponent(PLANTILLA)} download='plantilla_memoria.txt'>{d.link}</a>
    }
    return <a href='#' onClick={(e) => { e.preventDefault(); setVerInstrucciones(!verInstrucciones) }}>{d.link}</a>
  }

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
                {d.checked && d.side ? d.side : d.link ? renderLink(d) : d.side}
              </span>
            </label>
          ))}
          {g.key === 'examen' && verInstrucciones && <p className='muted'>{INSTRUCCIONES}</p>}
        </section>
      ))}
    </AppShell>
  )
}

export default DocumentosPage
