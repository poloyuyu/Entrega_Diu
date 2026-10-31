# SGM · MVP Memorias y Titulación

MVP en React del proyecto **Memorias y Titulación** (Sistema de Gestión de Memorias, Departamento de Informática, UTFSM), desarrollado para la **Tarea 9** del curso *Diseño de Interfaces Usuarias*.

El MVP es la continuación de la Entrega 2 del proyecto Lean UX y permite probar las hipótesis definidas para el **Estudiante Memorista (TT1/TT2)**: quién es el responsable de cada trámite, en qué etapa está su proceso, qué le falta para inscribir TT2 o rendir el examen de título, y cómo gestionar todo esto sin depender de correos.

> Es una aplicación **solo frontend**: no tiene backend. Los datos son simulados (pero cercanos a casos reales) y el estado se guarda en el navegador.

## Integrantes

- Martín García
- Tomás Castro
- Matías Peñaloza
- Martín Aranda
- Jaime Inostroza
- Samira Estay
- Nathan Sourdrille

## Metas de usuario implementadas

| N° | Meta | Pantalla |
|----|------|----------|
| 1 | Saber en qué etapa está mi proceso y quién es el responsable del trámite actual | Mi proceso |
| 2 | Encontrar un tema de memoria vigente, verificar su cupo y solicitarlo | Temas disponibles |
| 3 | Identificar qué requisitos y documentos me faltan para TT2 y el examen de título | Documentos / Mi proceso |
| 4 | Enviar un documento o solicitud formal y seguir su estado sin usar correo | Solicitudes |
| 5 | Enterarme a tiempo de plazos y cambios de estado de mis trámites | Notificaciones / Mi proceso |

## Qué incluye cada sección

- **Mi proceso:** indicador de etapas, trámite pendiente con responsable actual y tiempo estimado de respuesta, y próximos hitos con los días restantes. Cada hito lleva a la sección donde se resuelve.
- **Temas disponibles:** catálogo con búsqueda por título o profesor guía, filtro por área, cupos y fecha de actualización. Permite solicitar un tema (los temas sin cupo aparecen deshabilitados) y ver el estado en «Mis solicitudes».
- **Solicitudes:** formulario para enviar un documento en PDF (máx. 20 MB) con comentario opcional. La solicitud avanza de *Enviada* a *En revisión* y *Aprobada*, simulando la respuesta de Dirección de Estudios.
- **Notificaciones:** avisos de plazos, cambios de estado y nuevos temas, con contador de no leídas en el menú.
- **Documentos:** checklist de requisitos para el examen de título y para inscribir TT2, instrucciones desplegables y descarga de la plantilla de la memoria.

El estado está conectado entre las secciones: por ejemplo, un certificado aprobado en *Solicitudes* queda como *Validado* en *Documentos* y se refleja en los hitos de *Mi proceso* y en *Notificaciones*. La interfaz también se adapta a pantallas pequeñas (versión web móvil).

## Cómo ejecutarlo

Requisitos: **Node.js >= 16.13** y **npm >= 8**.

```bash
git clone https://github.com/poloyuyu/Entrega_Diu.git
cd Entrega_Diu
npm install
npm run dev
```

Luego abre <http://localhost:5050> en el navegador.

### Otros comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con recarga automática (puerto 5050) |

## Estructura del proyecto

```
src/
├── components/
│   ├── app_shell.jsx      # Estructura común: menú lateral, título y contenido
│   ├── app_state.jsx      # Estado compartido de la app (contexto) y datos simulados
│   └── sgm_styles.js      # Estilos globales del MVP
├── layout/
│   └── layout.jsx         # Layout general
├── pages/
│   ├── index.jsx          # Mi proceso
│   ├── temas.jsx          # Temas disponibles
│   ├── solicitudes.jsx    # Solicitudes
│   ├── notificaciones.jsx # Notificaciones
│   └── documentos.jsx     # Documentos
├── stylesheets/           # Estilos SCSS base
└── index.js               # Punto de entrada y rutas
```

## Tecnologías

- [React](https://react.dev/) 18
- [React Router](https://reactrouter.com/) 6
- Webpack 5 y Babel
- Proyecto base: [alexarenasf/frontend-sample-app](https://github.com/alexarenasf/frontend-sample-app)

## Limitaciones

Al ser un MVP de frontend, no hay autenticación ni backend: los datos, la sesión del estudiante y las respuestas de Dirección de Estudios son simulados, y el estado vive solo en el navegador de cada persona.