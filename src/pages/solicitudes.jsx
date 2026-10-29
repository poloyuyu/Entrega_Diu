import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import AppShell from '../components/app_shell'
import { useApp } from '../components/app_state'

const TIPOS = ['Informe de avance (memoria)', 'Informe final (memoria)', 'Certificado de inglés de salida', 'Validación de práctica profesional']
const ATAJOS = { avance: TIPOS[0], final: TIPOS[1], ingles: TIPOS[2], practica: TIPOS[3] }
const MAX_MB = 20

const tono = (estado) => (estado === 'Aprobada' || estado === 'Recibida' ? 'ok' : 'gold')

const SolicitudesPage = () => {
  const { solicitudes, enviarSolicitud } = useApp()
  const [params] = useSearchParams()
  const [tipo, setTipo] = useState(ATAJOS[params.get('tipo')] || TIPOS[0])
  const [archivo, setArchivo] = useState(null)
  const [error, setError] = useState('')
  const [comentario, setComentario] = useState('')
  const inputRef = useRef(null)

  // Si ya estás en Solicitudes y llega ?tipo=..., actualiza el selector
  useEffect(() => {
    const t = ATAJOS[params.get('tipo')]
    if (t) setTipo(t)
  }, [params])

  const onFile = (e) => {
    const f = e.target.files[0]
    setError('')
    if (!f) { setArchivo(null); return }
    if (f.type !== 'application/pdf') {
      setError('El archivo debe estar en formato PDF.')
      setArchivo(null)
      e.target.value = ''
      return
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setError(`El archivo supera el máximo de ${MAX_MB} MB.`)
      setArchivo(null)
      e.target.value = ''
      return
    }
    setArchivo(f)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!archivo) return
    enviarSolicitud({ tipo, archivo: archivo.name, comentario })
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
          <input ref={inputRef} type='file' accept='application/pdf' hidden onChange={onFile} />
          <div className='hint'>Formato PDF, máx. {MAX_MB} MB.</div>
          {error && <div className='field-error' role='alert'>{error}</div>}
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
            {s.comentario ? <div className='hint'>“{s.comentario}”</div> : null}
          </div>
          <span className={`chip ${tono(s.estado)}`}>{s.estado}</span>
        </div>
      ))}
    </AppShell>
  )
}

export default SolicitudesPage
