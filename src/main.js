import { supabase } from './supabase.js'

const LOGO = 'data:image/png;base64,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'

// ── STATE ──
let state = {
  user: null, role: null,
  activeDb: 'scouting-brasil',
  players: [], filtered: [],
  search: '', posFilter: '', levelFilter: '', yearFilter: '',
  sort: { key: 'nome', dir: 1 }
}

const DATABASES = [
  { id: 'scouting-brasil', label: 'Scouting Brasil', table: 'players' }
]

const LEVELS = ['A+','A','A/B','B+','B','B-','B/C']
const POSITIONS = ['GR','DD','DC','DE','MDC','MC','MD','ME','AD','AE','AC','PL']

// ── UTILS ──
function $(id) { return document.getElementById(id) }
function toast(msg, type='') {
  const t = $('toast')
  if (!t) return
  t.textContent = msg
  t.className = 'toast' + (type ? ' '+type : '')
  t.classList.add('show')
  setTimeout(() => t.classList.remove('show'), 2500)
}

// ── STYLES ──
function injectStyles() {
  const s = document.createElement('style')
  s.textContent = `
    * { box-sizing:border-box; margin:0; padding:0 }
    body { font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; background:#fff; color:#1a1a2e; -webkit-font-smoothing:antialiased; font-size:14px }
    html, body, #app { height:100%; overflow:hidden }
    #app { display:flex; flex-direction:column }

    /* TOPBAR */
    .topbar { height:52px; border-bottom:1px solid #eee; display:flex; align-items:center; justify-content:space-between; padding:0 20px; background:#fff; flex-shrink:0; gap:16px }
    .top-l { display:flex; align-items:center; gap:10px; flex-shrink:0 }
    .top-logo { width:28px; height:28px; border-radius:6px; object-fit:cover }
    .top-title { font-size:15px; font-weight:600; color:#0f1923 }
    .top-r { display:flex; align-items:center; gap:8px; flex-shrink:0 }
    .user-badge { font-size:12px; color:#888; padding:4px 8px; border:1px solid #eee; border-radius:6px }
    .out-btn { width:30px; height:30px; border:1px solid #eee; border-radius:7px; background:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#666 }
    .out-btn:hover { background:#f5f5f5 }

    /* TABS */
    .tabs-bar { display:flex; align-items:center; border-bottom:1px solid #eee; background:#fff; padding:0 20px; flex-shrink:0; gap:2px }
    .tab { padding:10px 16px; font-size:13px; color:#888; cursor:pointer; border-bottom:2px solid transparent; white-space:nowrap; transition:color 0.15s }
    .tab:hover { color:#333 }
    .tab.active { color:#0f1923; font-weight:500; border-bottom-color:#0f1923 }
    .tab-add { padding:8px 12px; font-size:13px; color:#bbb; cursor:pointer; display:flex; align-items:center; gap:4px; margin-left:4px }
    .tab-add:hover { color:#555 }

    /* FILTERS */
    .filters { padding:10px 20px; display:flex; align-items:center; gap:8px; border-bottom:1px solid #f5f5f5; background:#fff; flex-shrink:0; flex-wrap:wrap }
    .search-wrap { position:relative; flex:1; min-width:200px; max-width:320px }
    .search-wrap svg { position:absolute; left:10px; top:50%; transform:translateY(-50%); color:#bbb; pointer-events:none }
    .search-input { width:100%; padding:7px 10px 7px 32px; border:1px solid #eee; border-radius:7px; font-size:13px; outline:none; font-family:inherit; background:#fafafa }
    .search-input:focus { border-color:#5a757d; background:#fff }
    .filter-select { padding:7px 10px; border:1px solid #eee; border-radius:7px; font-size:13px; outline:none; font-family:inherit; background:#fafafa; color:#333; cursor:pointer }
    .filter-select:focus { border-color:#5a757d }
    .filter-reset { font-size:12px; color:#bbb; background:none; border:none; cursor:pointer; padding:4px 8px; border-radius:6px }
    .filter-reset:hover { color:#555; background:#f5f5f5 }
    .filters-right { display:flex; align-items:center; gap:6px; margin-left:auto }
    .count-badge { font-size:12px; color:#aaa }

    /* TABLE */
    .table-wrap { flex:1; overflow-y:auto }
    table { width:100%; border-collapse:collapse }
    thead { position:sticky; top:0; background:#fff; z-index:5 }
    thead th { padding:10px 16px; text-align:left; font-size:11px; font-weight:600; color:#aaa; text-transform:uppercase; letter-spacing:0.4px; border-bottom:1px solid #eee; cursor:pointer; white-space:nowrap; user-select:none }
    thead th:hover { color:#555 }
    thead th.sort-active { color:#0f1923 }
    tbody tr { border-bottom:1px solid #f8f8f8; transition:background 0.1s; cursor:pointer }
    tbody tr:hover { background:#fafafa }
    tbody td { padding:10px 16px; font-size:13px; color:#1a1a2e }
    .player-photo { width:32px; height:32px; border-radius:50%; object-fit:cover; border:1px solid #eee; background:#f5f5f5 }
    .level-badge { display:inline-block; padding:2px 8px; border-radius:4px; font-size:11px; font-weight:600 }
    .level-Aplus { background:#e8f5e9; color:#2e7d32 }
    .level-A { background:#e8f5e9; color:#388e3c }
    .level-AB { background:#e8f5e9; color:#43a047 }
    .level-Bplus { background:#e3f2fd; color:#1565c0 }
    .level-B { background:#e3f2fd; color:#1976d2 }
    .level-Bminus { background:#fff3e0; color:#e65100 }
    .level-BC { background:#fff3e0; color:#ef6c00 }
    .pos-badge { display:inline-block; padding:2px 7px; border-radius:4px; font-size:11px; font-weight:600; background:#f0f0f0; color:#555 }
    .novo-badge { display:inline-block; padding:1px 6px; border-radius:4px; font-size:10px; font-weight:700; background:#ffe0e0; color:#c62828; margin-left:6px }
    .empty-state { padding:60px; text-align:center; color:#bbb; font-size:13px }
    .loading-state { padding:40px; text-align:center; color:#bbb; font-size:13px; display:flex; align-items:center; justify-content:center; gap:8px }
    .spin { width:14px; height:14px; border:2px solid #eee; border-top-color:#5a757d; border-radius:50%; animation:sp 0.7s linear infinite }
    @keyframes sp { to { transform:rotate(360deg) } }

    /* AUTH */
    .auth-wrap { height:100%; display:flex; align-items:center; justify-content:center; padding:24px; background:#f5f6f8 }
    .auth-box { width:100%; max-width:360px; background:#fff; border-radius:14px; padding:32px 28px; box-shadow:0 2px 16px rgba(0,0,0,0.08) }
    .auth-logo { text-align:center; margin-bottom:24px }
    .auth-logo img { width:52px; height:52px; border-radius:10px; display:block; margin:0 auto 12px }
    .auth-logo h1 { font-size:18px; font-weight:600; color:#0f1923 }
    .auth-logo p { font-size:13px; color:#aaa; margin-top:3px }
    .auth-field { margin-bottom:12px }
    .auth-field label { display:block; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; color:#aaa; margin-bottom:4px }
    .auth-field input { width:100%; padding:10px 12px; border:1.5px solid #e5e5e5; border-radius:8px; font-size:14px; outline:none; font-family:inherit; transition:border-color 0.15s }
    .auth-field input:focus { border-color:#5a757d }
    .auth-submit { width:100%; padding:11px; background:#5a757d; color:#fff; border:none; border-radius:8px; font-size:15px; font-weight:600; cursor:pointer; font-family:inherit; transition:opacity 0.15s }
    .auth-submit:hover { opacity:0.9 }
    .auth-submit:disabled { opacity:0.5 }
    .auth-err { background:#fff0f0; border:1px solid #fca5a5; border-radius:7px; padding:8px 12px; font-size:13px; color:#dc2626; margin-bottom:10px }

    /* TOAST */
    .toast { position:fixed; bottom:18px; left:50%; transform:translateX(-50%) translateY(8px); background:#1a1a2e; color:#fff; font-size:13px; padding:9px 16px; border-radius:9px; opacity:0; transition:opacity 0.2s,transform 0.2s; pointer-events:none; white-space:nowrap; z-index:300 }
    .toast.show { opacity:1; transform:translateX(-50%) translateY(0) }
    .toast.success { background:#16a34a }
    .toast.error { background:#dc2626 }

    @media(max-width:768px) {
      .filters { gap:6px }
      .search-wrap { min-width:140px }
      td.hide-mobile, th.hide-mobile { display:none }
    }
  `
  document.head.appendChild(s)
}

// ── AUTH ──
function renderAuth() {
  $('app').innerHTML = `
    <div class="auth-wrap">
      <div class="auth-box">
        <div class="auth-logo">
          <img src="${LOGO}" />
          <h1>All In Sports</h1>
          <p>Base de Dados</p>
        </div>
        <div id="aer" class="auth-err" style="display:none"></div>
        <div class="auth-field"><label>Email</label><input type="email" id="ai" placeholder="o teu email" autocomplete="email"/></div>
        <div class="auth-field"><label>Password</label><input type="password" id="ap" placeholder="••••••••" autocomplete="current-password"/></div>
        <button class="auth-submit" id="ab">Entrar</button>
      </div>
    </div>
    <div class="toast" id="toast"></div>
  `
  const doLogin = async () => {
    const email = $('ai').value.trim()
    const pass = $('ap').value
    const btn = $('ab'), err = $('aer')
    btn.disabled = true; btn.textContent = 'A entrar...'
    err.style.display = 'none'
    const r = await supabase.auth.signInWithPassword({ email, password: pass })
    if (r.error) {
      err.textContent = 'Email ou password incorretos.'
      err.style.display = 'block'
      btn.disabled = false; btn.textContent = 'Entrar'
    }
  }
  $('ab').addEventListener('click', doLogin)
  $('ap').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin() })
}

// ── MAIN SHELL ──
function renderShell() {
  const tabsHtml = DATABASES.map(db => `
    <div class="tab ${db.id === state.activeDb ? 'active' : ''}" data-db="${db.id}">${db.label}</div>
  `).join('')

  $('app').innerHTML = `
    <div class="topbar">
      <div class="top-l">
        <img class="top-logo" src="${LOGO}" />
        <span class="top-title">All In Sports</span>
      </div>
      <div class="top-r">
        <span class="user-badge">${state.user?.email || ''}</span>
        <button class="out-btn" id="btn-out" title="Sair">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        </button>
      </div>
    </div>
    <div class="tabs-bar" id="tabs-bar">
      ${tabsHtml}
      <div class="tab-add" id="tab-add">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Nova base de dados
      </div>
    </div>
    <div class="filters" id="filters">
      <div class="search-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input class="search-input" id="search" placeholder="Pesquisar jogador..." />
      </div>
      <select class="filter-select" id="f-pos">
        <option value="">Posição</option>
        ${POSITIONS.map(p => `<option value="${p}">${p}</option>`).join('')}
      </select>
      <select class="filter-select" id="f-level">
        <option value="">Nível</option>
        ${LEVELS.map(l => `<option value="${l}">${l}</option>`).join('')}
      </select>
      <select class="filter-select" id="f-year">
        <option value="">Ano</option>
      </select>
      <button class="filter-reset" id="f-reset">Limpar</button>
      <div class="filters-right">
        <span class="count-badge" id="count"></span>
      </div>
    </div>
    <div class="table-wrap" id="table-wrap">
      <div class="loading-state"><div class="spin"></div> A carregar...</div>
    </div>
    <div class="toast" id="toast"></div>
  `

  // Events
  $('btn-out').addEventListener('click', async () => { await supabase.auth.signOut(); renderAuth() })
  $('search').addEventListener('input', e => { state.search = e.target.value; applyFilters() })
  $('f-pos').addEventListener('change', e => { state.posFilter = e.target.value; applyFilters() })
  $('f-level').addEventListener('change', e => { state.levelFilter = e.target.value; applyFilters() })
  $('f-year').addEventListener('change', e => { state.yearFilter = e.target.value; applyFilters() })
  $('f-reset').addEventListener('click', resetFilters)
  $('tab-add').addEventListener('click', () => toast('Em breve — nova base de dados', ''))
  document.querySelectorAll('.tab[data-db]').forEach(tab => {
    tab.addEventListener('click', () => switchDb(tab.dataset.db))
  })
}

function switchDb(dbId) {
  state.activeDb = dbId
  state.players = []; state.filtered = []
  state.search = ''; state.posFilter = ''; state.levelFilter = ''; state.yearFilter = ''
  document.querySelectorAll('.tab[data-db]').forEach(t => t.classList.toggle('active', t.dataset.db === dbId))
  loadPlayers()
}

function resetFilters() {
  state.search = ''; state.posFilter = ''; state.levelFilter = ''; state.yearFilter = ''
  $('search').value = ''
  $('f-pos').value = ''
  $('f-level').value = ''
  $('f-year').value = ''
  applyFilters()
}

// ── LOAD DATA ──
async function loadPlayers() {
  const wrap = $('table-wrap')
  if (wrap) wrap.innerHTML = '<div class="loading-state"><div class="spin"></div> A carregar...</div>'

  const db = DATABASES.find(d => d.id === state.activeDb)
  if (!db) return

  const { data, error } = await supabase.from(db.table).select('*').order('nome')
  if (error) { toast('Erro ao carregar dados.', 'error'); return }

  state.players = data || []

  // Populate year filter
  const years = [...new Set(state.players.map(p => String(p.ano)).filter(Boolean))].sort((a,b) => b-a)
  const ySelect = $('f-year')
  if (ySelect) {
    ySelect.innerHTML = '<option value="">Ano</option>' + years.map(y => `<option value="${y}">${y}</option>`).join('')
  }

  applyFilters()
}

function applyFilters() {
  const s = state.search.toLowerCase()
  state.filtered = state.players.filter(p => {
    if (s && !p.nome?.toLowerCase().includes(s) && !p.clube?.toLowerCase().includes(s)) return false
    if (state.posFilter && p.posicao !== state.posFilter) return false
    if (state.levelFilter && p.nivel !== state.levelFilter) return false
    if (state.yearFilter && String(p.ano) !== state.yearFilter) return false
    return true
  })
  renderTable()
}

// ── RENDER TABLE ──
function isNew(p) {
  if (!p.created_at) return false
  const d = new Date(p.created_at)
  return (Date.now() - d.getTime()) < 10 * 24 * 60 * 60 * 1000
}

function levelClass(nivel) {
  const map = {'A+':'Aplus','A':'A','A/B':'AB','B+':'Bplus','B':'B','B-':'Bminus','B/C':'BC'}
  return 'level-' + (map[nivel] || 'B')
}

function sortIcon(key) {
  if (state.sort.key !== key) return '<span style="color:#ddd; margin-left:4px">↕</span>'
  return state.sort.dir === 1 ? '<span style="margin-left:4px">↑</span>' : '<span style="margin-left:4px">↓</span>'
}

function renderTable() {
  const wrap = $('table-wrap')
  if (!wrap) return

  const count = $('count')
  if (count) count.textContent = state.filtered.length + ' jogador' + (state.filtered.length !== 1 ? 'es' : '')

  if (!state.filtered.length) {
    wrap.innerHTML = '<div class="empty-state">Nenhum jogador encontrado</div>'
    return
  }

  const sorted = [...state.filtered].sort((a, b) => {
    const k = state.sort.key, d = state.sort.dir
    const av = a[k] || '', bv = b[k] || ''
    if (k === 'ano') return (parseInt(av) - parseInt(bv)) * d
    return String(av).localeCompare(String(bv)) * d
  })

  wrap.innerHTML = `
    <table>
      <thead>
        <tr>
          <th style="width:48px"></th>
          <th class="${state.sort.key==='nome'?'sort-active':''}" data-sort="nome">Nome ${sortIcon('nome')}</th>
          <th class="${state.sort.key==='posicao'?'sort-active':''} hide-mobile" data-sort="posicao">Posição ${sortIcon('posicao')}</th>
          <th class="${state.sort.key==='nivel'?'sort-active':''}" data-sort="nivel">Nível ${sortIcon('nivel')}</th>
          <th class="${state.sort.key==='clube'?'sort-active':''} hide-mobile" data-sort="clube">Clube ${sortIcon('clube')}</th>
          <th class="${state.sort.key==='ano'?'sort-active':''} hide-mobile" data-sort="ano">Ano ${sortIcon('ano')}</th>
        </tr>
      </thead>
      <tbody>
        ${sorted.map(p => {
          const foto = p.soccerwiki_id ? `https://cdn.soccerwiki.org/images/player/${p.soccerwiki_id}.png` : ''
          const photoEl = foto
            ? `<img class="player-photo" src="${foto}" onerror="this.style.display='none'" />`
            : `<div style="width:32px;height:32px;border-radius:50%;background:#f0f0f0;display:flex;align-items:center;justify-content:center;font-size:11px;color:#aaa;">${(p.nome||'?')[0]}</div>`
          const novoBadge = isNew(p) ? '<span class="novo-badge">NOVO</span>' : ''
          return `<tr data-id="${p.id}">
            <td style="text-align:center">${photoEl}</td>
            <td><span style="font-weight:500">${p.nome||''}</span>${novoBadge}</td>
            <td class="hide-mobile"><span class="pos-badge">${p.posicao||''}</span></td>
            <td><span class="level-badge ${levelClass(p.nivel)}">${p.nivel||''}</span></td>
            <td class="hide-mobile">${p.clube||''}</td>
            <td class="hide-mobile">${p.ano||''}</td>
          </tr>`
        }).join('')}
      </tbody>
    </table>
  `

  // Sort headers
  wrap.querySelectorAll('th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.dataset.sort
      if (state.sort.key === key) state.sort.dir *= -1
      else { state.sort.key = key; state.sort.dir = 1 }
      renderTable()
    })
  })
}

// ── INIT ──
async function init() {
  injectStyles()
  const { data: { session } } = await supabase.auth.getSession()
  state.user = session?.user || null
  if (!state.user) { renderAuth(); return }

  const { data: profile } = await supabase.from('user_roles').select('role').eq('user_id', state.user.id).single()
  state.role = profile?.role || 'viewer'

  renderShell()
  loadPlayers()

  supabase.auth.onAuthStateChange((event, session) => {
    state.user = session?.user || null
    if (!state.user) renderAuth()
    else if (event === 'SIGNED_IN') init()
  })
}

init()
