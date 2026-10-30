const css = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Source+Serif+4:wght@600;700&display=swap');

:root {
  --navy: #0e2347; --navy-2: #172f58; --bg: #f5f3ee; --card: #fff;
  --ink: #0e2347; --muted: #5d6679; --line: #dcd8cf; --gold: #b9822a;
  --green: #2c6e4f; --link: #1d3f8f;
  --warn-bg: #f8e3d6; --warn-ink: #b4532a;
  --ok-bg: #dcefe6; --ok-ink: #2c6e4f;
  --neutral-bg: #ece8dd; --neutral-ink: #5d6679;
  --gold-bg: #f3e3c3;
}
* { box-sizing: border-box; }
body { margin: 0; }
.sgm { display: flex; min-height: 100vh; background: var(--bg); color: var(--ink);
  font-family: 'IBM Plex Sans', system-ui, sans-serif; }

/* Sidebar */
.sgm-side { width: 228px; flex-shrink: 0; background: var(--navy); color: #fff; display: flex;
  flex-direction: column; padding: 36px 16px 0; position: sticky; top: 0; height: 100vh; }
.sgm-brand { font-family: 'Source Serif 4', serif; font-weight: 700; font-size: 20px; }
.sgm-brand-sub { font-size: 11px; color: #8fa3c7; margin-top: 4px; }
.sgm-user { margin: 28px 0 26px; padding: 14px; background: var(--navy-2); border-radius: 8px; }
.sgm-user-name { font-weight: 600; font-size: 13px; }
.sgm-user-meta { font-size: 11px; color: #8fa3c7; margin-top: 6px; line-height: 1.5; }
.sgm-nav { display: flex; flex-direction: column; gap: 4px; }
.sgm-nav a { display: flex; gap: 10px; align-items: center; justify-content: space-between; text-decoration: none;
  color: #d6def0; font-size: 13px; padding: 12px; border-radius: 6px; border-left: 3px solid transparent;
  transition: background .15s; }
.sgm-nav a:hover { background: rgba(255,255,255,.06); }
.sgm-nav a.active { background: var(--navy-2); color: #fff; font-weight: 600; border-left-color: var(--gold); }
.sgm-nav .count { background: var(--gold); color: #fff; font-size: 11px; font-weight: 600; min-width: 20px;
  height: 20px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; }
.sgm-side-foot { margin-top: auto; padding: 16px 0 20px; border-top: 1px solid rgba(255,255,255,.12);
  font-size: 11px; line-height: 1.5; color: #8fa3c7; }
.sgm-flag { display: flex; height: 6px; margin: 0 -16px; }
.sgm-flag span { flex: 1; }

/* Main */
.sgm-main { flex: 1; padding: 40px 46px 60px; }
.sgm-wrap { max-width: 808px; }
.sgm-h1 { font-family: 'Source Serif 4', serif; font-size: 28px; font-weight: 700; margin: 0 0 12px; }
.sgm-lead { color: var(--muted); font-size: 14px; line-height: 1.5; max-width: 470px; margin: 0 0 28px; }
.sgm-rule { border: 0; border-top: 1px solid var(--line); margin: 0 0 24px; }
.h2 { font-family: 'Source Serif 4', serif; font-size: 18px; font-weight: 700; margin: 0 0 20px; }
.eyebrow { font-size: 11px; letter-spacing: .06em; text-transform: uppercase; color: var(--muted); }
.mono { font-family: 'IBM Plex Mono', monospace; }
.muted { color: var(--muted); font-size: 13px; }

/* Stepper */
.stepper { display: grid; grid-template-columns: repeat(4, 1fr); margin: 0 0 26px; padding: 0; list-style: none; }
.step { position: relative; }
.step-dot { position: relative; z-index: 1; width: 12px; height: 12px; border-radius: 50%; background: #d9d3c4; margin-bottom: 20px; }
.step::after { content: ""; position: absolute; top: 5px; left: 18px; right: 6px; height: 2px; background: #d9d3c4; }
.step:last-child::after { display: none; }
.step.done .step-dot, .step.done::after { background: var(--green); }
.step.current .step-dot { background: var(--gold); box-shadow: 0 0 0 4px #fff, 0 0 0 5.5px var(--gold);
  width: 14px; height: 14px; margin: -1px 0 19px -1px; }
.step-label { font-size: 12px; color: var(--muted); }
.step.done .step-label, .step.current .step-label { color: var(--ink); font-weight: 600; }

/* Cards / lists */
.pending { background: var(--card); border: 1px solid var(--line); border-left: 3px solid var(--gold);
  border-radius: 4px; padding: 22px; display: flex; flex-wrap: wrap; justify-content: space-between;
  gap: 14px 24px; margin-bottom: 40px; }
.pending-title { font-size: 15px; font-weight: 600; margin-top: 8px; }
.pending-meta { flex-basis: 100%; font-size: 12px; color: var(--muted); margin-top: 8px; }
.milestones { list-style: none; margin: 0 0 48px; padding: 0; }
.milestone { display: flex; gap: 14px; align-items: flex-start; padding: 16px 0; border-bottom: 1px solid var(--line); }
.milestone:last-child { border-bottom: 0; }
.milestone-title { font-size: 14px; font-weight: 600; }
.milestone-detail { font-size: 12.5px; color: var(--muted); margin-top: 6px; }
.faq p { color: var(--muted); font-size: 13.5px; line-height: 1.6; max-width: 540px; margin: 0; }

.badge { font-family: 'IBM Plex Mono', monospace; font-size: 12px; padding: 7px 14px; border-radius: 4px;
  white-space: nowrap; min-width: 78px; text-align: center; }
.chip { font-family: 'IBM Plex Mono', monospace; font-size: 11px; padding: 3px 10px; border-radius: 12px; white-space: nowrap; }
.warn { background: var(--warn-bg); color: var(--warn-ink); }
.ok { background: var(--ok-bg); color: var(--ok-ink); }
.neutral { background: var(--neutral-bg); color: var(--neutral-ink); }
.gold { background: var(--gold-bg); color: #8a5d12; }

/* Buttons / forms */
.btn { background: var(--navy); color: #fff; border: 0; border-radius: 4px; font: inherit; font-size: 12px;
  font-weight: 600; padding: 9px 14px; cursor: pointer; }
.btn:hover:not(:disabled) { background: var(--navy-2); }
.btn:disabled { background: #98a1b0; cursor: not-allowed; }
.field { margin-bottom: 18px; max-width: 344px; }
.field label { display: block; font-size: 11.5px; font-weight: 600; margin-bottom: 7px; }
.input, .select, .textarea { width: 100%; font: inherit; font-size: 12px; color: var(--ink); background: #fff;
  border: 1px solid var(--line); border-radius: 4px; padding: 9px 10px; }
.textarea { min-height: 74px; resize: vertical; }
.dropzone { display: block; width: 100%; text-align: left; cursor: pointer; background: #fff;
  border: 1px dashed var(--link); border-radius: 4px; padding: 9px 10px; font-size: 12px; color: var(--muted); }
.hint { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; color: var(--muted); margin-top: 6px; line-height: 1.5; }

/* Temas */
.filters { display: flex; gap: 8px; margin-bottom: 14px; }
.filters .input { flex: 1; }
.filters .select { width: 140px; }
.tema { background: #fff; border: 1px solid var(--line); border-radius: 4px; padding: 14px 16px;
  display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 8px; }
.tema h3 { font-family: 'Source Serif 4', serif; font-size: 14px; margin: 0 0 6px; }
.tema .prof { font-size: 11.5px; color: var(--muted); margin-bottom: 10px; }
.tema .chips { display: flex; gap: 6px; flex-wrap: wrap; }

/* Solicitudes list */
.req { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-bottom: 1px solid var(--line); }
.req-title { font-size: 13px; }

/* Notificaciones */
.notif { display: flex; align-items: flex-start; gap: 12px; padding: 16px 12px; border-bottom: 1px solid var(--line); cursor: pointer;
  background: none; border-left: 0; border-right: 0; border-top: 0; border-radius: 4px; width: 100%; text-align: left; font: inherit; color: inherit;
  transition: background .15s ease; }
.notif:hover { background: rgba(14, 35, 71, .05); }
.notif:focus-visible { outline: 2px solid var(--link); outline-offset: 2px; }
.notif-icon { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 12px; flex-shrink: 0; }
.notif-title { font-size: 13px; font-weight: 600; }
.notif.read .notif-title { font-weight: 400; color: var(--muted); }
.notif-body { font-size: 12px; color: var(--muted); margin-top: 4px; }
.notif-time { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; color: var(--muted); margin-top: 4px; }

/* Documentos */
.doc-group { margin-bottom: 32px; }
.doc { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--line); font-size: 13px; }
.doc input { width: 15px; height: 15px; accent-color: var(--green); }
.doc.checked .doc-name { text-decoration: line-through; color: #8a91a0; }
.doc-name { flex: 1; }
.doc-side { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--muted); }
.doc-side a { color: var(--link); text-decoration: underline; font-family: 'IBM Plex Sans', sans-serif; font-size: 11.5px; font-weight: 600; }

.milestone[role='link'] { cursor: pointer; transition: background .15s; }
.milestone[role='link']:hover { background: rgba(0, 0, 0, .04); }
.milestone[role='link']:focus-visible { outline: 2px solid var(--link); outline-offset: 2px; }
.doc input:disabled { cursor: not-allowed; }

@media (max-width: 820px) {
  .sgm { flex-direction: column; }
  .sgm-side { width: 100%; height: auto; position: static; padding: 20px 16px 0; }
  .sgm-user { margin: 16px 0; }
  .sgm-nav { flex-direction: row; flex-wrap: wrap; }
  .sgm-side-foot { display: none; }
  .sgm-main { padding: 28px 20px 48px; }
  .stepper { grid-template-columns: 1fr; row-gap: 0; }
  .step { display: grid; grid-template-columns: 14px minmax(0, 1fr); column-gap: 12px; padding-bottom: 16px; }
  .step-dot { grid-column: 1; grid-row: 1; margin: 2px 0 0; }
  .step-label { grid-column: 2; grid-row: 1; }
  .step::after { top: 8px; right: auto; bottom: -8px; left: 5px; width: 2px; height: auto; }
  .step.current .step-dot { margin: 1px 0 0; }
}

/* Hitos: el <Link> se ve igual que antes (sin estilo de enlace) */
.milestones a.milestone,
.milestones a.milestone:visited,
.milestones a.milestone:hover {
  color: inherit;
  text-decoration: none;
}
.milestones a.milestone .milestone-title { color: var(--ink); }
.milestones a.milestone .milestone-detail { color: var(--muted); }
.milestones a.milestone .badge { flex-shrink: 0; min-width: 96px; }
`

export default css
