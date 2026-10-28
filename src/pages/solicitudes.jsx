import React, { useRef, useState } from 'react'
import AppShell from '../components/app_shell'
import { useApp } from '../components/app_state'

const TIPOS = ['Informe de avance (memoria)', 'Informe final (memoria)', 'Certificado de inglés de salida', 'Validación de práctica profesional']

const SolicitudesPage = () => {
  const { solicitudes, enviarSolicitud } = useApp()
  const [tipo, setTipo] = useState(TIPOS[0])
  const [archivo, setArchivo] = useState(null)
  const [comentario, setComentario] = useState('')
  const inputRef = useRef(null)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!archivo) return
    enviarSolicitud({ tipo, archivo: archivo.name })
    setArchivo(null)
    setComentario('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <AppShell
      title='Enviar solicitud formal'
      lead='Sube un documento de avance y envíalo para su revisión oficial — sin correos ni WhatsApp.'
    >
      <h2 className='h2' style={{ fontSize: 16 }}>Nueva solicitud</h2>
      <form onSubmit={onSubmit}>
        <div className='field'>
          <label htmlFor='tipo'>Tipo de documento</label>
          <select id='tipo' className='select' value={tipo} onChange={(e) => setTipo(e.target.value)}>
            {TIPOS.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div className='field'>
          <label>Documento de avance</label>
          <button type='button' className='dropzone' onClick={() => inputRef.current?.click()}>
            {archivo ? archivo.name : 'Adjuntar documento'}
          </button>
          <input ref={inputRef} type='file' accept='application/pdf' hidden onChange={(e) => setArchivo(e.target.files[0] || null)} />
          <div className='hint'>Formato PDF, máx. 20 MB.</div>
        </div>

        <div className='field'>
          <label htmlFor='coment'>Comentario (opcional)</label>
          <textarea id='coment' className='textarea' placeholder='Ej.: enviado 2 días antes de la fecha límite para revisión anticipada.' value={comentario} onChange={(e) => setComentario(e.target.value)} />
        </div>

        <button className='btn' type='submit' disabled={!archivo}>Enviar solicitud de revisión</button>
      </form>

      <h2 className='h2' style={{ margin: '36px 0 8px', fontSize: 16 }}>Mis solicitudes</h2>
      {solicitudes.map((s) => (
        <div key={s.id} className='req'>
          <div>
            <div className='req-title'>{s.tipo}</div>
            <div className='hint'>{s.archivo} · {s.fecha}</div>
          </div>
          <span className='chip gold'>{s.estado}</span>
        </div>
      ))}
    </AppShell>
  )
}

export default SolicitudesPage
