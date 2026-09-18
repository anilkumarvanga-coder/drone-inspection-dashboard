import { useState } from 'react'
import type { FormEvent } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Activity, Bell, CalendarDays, ChevronDown, Clock3, Cloud, Gauge, LayoutDashboard, LogIn, LogOut, Map, Menu, Navigation, Pause, Play, Radio, RefreshCcw, Search, Settings, ShieldCheck, Square, Sun, Target, Users, X } from 'lucide-react'
import { assetSummary, findingsBySeverity, flights, projects } from './data/mockData'
import { useLiveTelemetry } from './hooks/useLiveTelemetry'
import './App.css'

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const login = (event: FormEvent) => {
    event.preventDefault()
    if (!username.trim() || !password.trim()) {
      setError('Enter both your username and password to continue.')
      return
    }
    setError('')
    setAuthenticated(true)
  }

  return authenticated
    ? <Dashboard username={username} onLogout={() => setAuthenticated(false)} />
    : <LoginPage username={username} password={password} error={error} setUsername={setUsername} setPassword={setPassword} onSubmit={login} />
}

function LoginPage({ username, password, error, setUsername, setPassword, onSubmit }: {
  username: string
  password: string
  error: string
  setUsername: (value: string) => void
  setPassword: (value: string) => void
  onSubmit: (event: FormEvent) => void
}) {
  return <main className="login-page">
    <section className="login-visual">
      <div className="login-brand"><span className="brand-mark"><Navigation size={18} /></span><span><strong>SKYTRACE</strong><small>inspection ops</small></span></div>
      <div className="login-copy"><p className="eyebrow">DRONE INSPECTION INTELLIGENCE</p><h1>See every asset.<br /><em>Know every risk.</em></h1><p>One clear view for drone-led inspections, findings, and flight history across every project.</p><div className="solar-orbit"><Sun size={92} strokeWidth={1} /><span>ALL PROJECTS · ONE WORKSPACE</span></div></div>
      <span className="login-version">SKYTRACE / OPERATIONS CONSOLE 0.1</span>
    </section>
    <section className="login-panel"><div className="login-form-wrap"><div className="mobile-login-brand"><Sun size={18} /> SKYTRACE</div><p className="eyebrow">WELCOME BACK</p><h2>Sign in to your workspace</h2><p className="login-subtitle">Use your operations account to continue.</p><form onSubmit={onSubmit}><label htmlFor="username">Username</label><input id="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter username" autoComplete="username" /><label htmlFor="password">Password</label><input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" autoComplete="current-password" />{error && <p className="login-error" role="alert">{error}</p>}<button className="login-button" type="submit">Sign in <LogIn size={16} /></button></form><p className="demo-hint">Demo access: enter any username and password.</p></div></section>
  </main>
}

function Dashboard({ username, onLogout }: { username: string; onLogout: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activePage, setActivePage] = useState('Overview')
  const [selectedProject, setSelectedProject] = useState(projects[0].name)
  const [selectedFlight, setSelectedFlight] = useState(flights[0].id)
  const { telemetry, history, isLive, startFlight, pauseFlight, stopFlight, resetFlight } = useLiveTelemetry()
  const project = projects.find((item) => item.name === selectedProject) ?? projects[0]
  const projectFlights = flights.filter((flight) => flight.project === project.name)
  const currentFlight = flights.find((flight) => flight.id === selectedFlight) ?? projectFlights[0] ?? flights[0]
  const navigate = (page: string) => { setActivePage(page); setMobileOpen(false) }
  const chooseProject = (value: string) => { setSelectedProject(value); const firstFlight = flights.find((flight) => flight.project === value); if (firstFlight) setSelectedFlight(firstFlight.id) }
  const chartData = history.map((point) => ({ time: point.time, altitude: point.altitude, speed: point.speed }))
  const navItems = [[LayoutDashboard, 'Overview'], [Map, 'Live monitoring'], [Target, 'Projects'], [Clock3, 'Historical flights'], [Activity, 'Analytics']] as const
  const manageItems = [[ShieldCheck, 'Reports'], [Users, 'Team'], [Settings, 'System']] as const

  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? 'is-open' : ''}`}><div className="brand"><div className="brand-mark"><Navigation size={18} /></div><div><strong>SKYTRACE</strong><span>inspection ops</span></div><button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={18} /></button></div><div className="demo-chip"><span className="pulse-dot" /> DEMO ENVIRONMENT</div><NavGroup label="Workspace" items={navItems} activePage={activePage} navigate={navigate} live /><NavGroup label="Manage" items={manageItems} activePage={activePage} navigate={navigate} /><div className="sidebar-bottom"><div className="support-card"><span>?</span><div><strong>Need help?</strong><small>View documentation</small></div><ChevronDown size={15} /></div><div className="user-row"><div className="avatar">{username.slice(0, 2).toUpperCase()}</div><div><strong>{username}</strong><span>All project access</span></div><ChevronDown size={15} /></div></div></aside>
    {mobileOpen && <button className="scrim" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />}
    <main className="main-content"><header className="topbar"><button className="menu-button" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={21} /></button><div className="crumb"><span>Workspace</span><span>/</span><strong>{activePage}</strong></div><div className="top-actions"><div className="project-select"><span className="select-label">Project</span><select value={selectedProject} onChange={(event) => chooseProject(event.target.value)} aria-label="Select project">{projects.map((item) => <option key={item.id}>{item.name}</option>)}</select><ChevronDown size={14} /></div><button className="icon-button" aria-label="Search"><Search size={18} /></button><button className="icon-button has-alert" aria-label="Notifications"><Bell size={18} /></button><div className="top-avatar">{username.slice(0, 2).toUpperCase()}</div></div></header>
      <div className="page-wrap"><section className="page-heading"><div><p className="eyebrow">THURSDAY, 18 SEPTEMBER 2026</p><h1>Good morning, {username}</h1><p className="subheading">{project.name} <span>•</span> {project.location}</p></div><div className="heading-actions"><span className="data-status"><Cloud size={16} /> All systems simulated</span><button className="outline-button"><RefreshCcw size={15} /> Refresh data</button><button className="logout-button" onClick={onLogout} aria-label="Sign out"><LogOut size={15} /></button></div></section>
        <div className="stats-grid">{[['Active projects', '03', '↑ 12.5%', 'vs last month', 'teal'], ['Solar flights', '12', '↑ 18.2%', 'this month', 'amber'], ['Panels inspected', '4,860', '↑ 21.7%', 'this month', 'blue'], ['Open findings', '67', '↓ 8.3%', 'vs last month', 'coral']].map(([label, value, change, caption, tone]) => <article className="stat-card" key={label}><div className={`stat-icon ${tone}`}><Activity size={18} /></div><div><span className="stat-label">{label}</span><strong>{value}</strong><span className="stat-change">{change} <small>{caption}</small></span></div></article>)}</div>
        <section className="content-grid"><article className="panel live-panel"><PanelHeading title={`${currentFlight.id} · Solar array inspection`} eyebrow="Live mission" subtitle={`${project.name} • DJI Mavic 3E`} badge="SIMULATED LIVE" /><div className="mission-body"><div className="map-preview solar-map"><div className="map-grid" /><div className="panel-field"><i /><i /><i /><i /><i /><i /><i /><i /></div><span className="map-label label-one">BLOCK A-04</span><span className="map-label label-two">INVERTER 08</span><div className="route-line" /><div className="drone-pin"><Navigation size={16} /></div><span className="map-scale">100 m</span><div className="map-legend"><span>Flight path</span><span>Solar assets</span></div></div><div className="telemetry"><div className="telemetry-header"><span>Telemetry</span><span className="signal"><Radio size={14} /> Strong signal</span></div><div className="telemetry-grid"><Metric icon={<Gauge size={15} />} label="Altitude" value={`${telemetry.altitude} m`} /><Metric icon={<Activity size={15} />} label="Speed" value={`${telemetry.speed} m/s`} /><Metric icon={<Target size={15} />} label="Heading" value={`${telemetry.heading}°`} /><Metric icon={<Cloud size={15} />} label="Battery" value={`${telemetry.battery}%`} accent /></div><div className="coordinates"><span>GPS coordinates</span><strong>{telemetry.latitude.toFixed(4)}° N, {telemetry.longitude.toFixed(4)}° E</strong></div><div className="mission-controls"><button className="primary-button" onClick={isLive ? pauseFlight : startFlight}>{isLive ? <Pause size={15} /> : <Play size={15} />}{isLive ? 'Pause flight' : 'Resume flight'}</button><button className="square-button" onClick={stopFlight} aria-label="Stop flight"><Square size={15} /></button><button className="square-button" onClick={resetFlight} aria-label="Reset flight"><RefreshCcw size={15} /></button></div></div></div></article>
          <article className="panel history-panel"><PanelHeading title="Previous flight data" subtitle="Select a flight to review its record" icon={<CalendarDays size={17} />} /><div className="flight-list">{projectFlights.map((flight) => <button className={`flight-row ${selectedFlight === flight.id ? 'selected' : ''}`} key={flight.id} onClick={() => setSelectedFlight(flight.id)}><span className="flight-status"><Clock3 size={14} /></span><span className="flight-info"><strong>{flight.id}</strong><span>{flight.date}</span></span><span className="flight-meta"><strong>{flight.duration}</strong><span>{flight.distance}</span></span></button>)}</div><div className="selected-record"><span>Selected record</span><strong>{currentFlight.id} · {currentFlight.date}</strong><small>{currentFlight.duration} flight time • {currentFlight.distance} covered</small></div></article></section>
        <section className="lower-grid"><article className="panel chart-panel"><PanelHeading title="Live telemetry" subtitle="Flight performance over the last 20 minutes" /><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#214257" /><XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6f91a4' }} /><YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6f91a4' }} width={28} /><Tooltip contentStyle={{ background: '#0b1f31', border: '1px solid #28506a', color: '#d8e7f1' }} /><Area type="monotone" dataKey="altitude" stroke="#38c6ea" fill="#38c6ea" fillOpacity={.12} /><Area type="monotone" dataKey="speed" stroke="#f3ad48" fill="transparent" /></AreaChart></ResponsiveContainer></div></article><article className="panel summary-panel"><PanelHeading title="Solar asset overview" subtitle={`${project.assetCount.toLocaleString()} tracked assets`} icon={<Sun size={17} />} /><div className="asset-list">{assetSummary.map((asset) => <div className="asset-row" key={asset.label}><span className={`asset-dot ${asset.tone}`} /><span>{asset.label}</span><strong>{asset.value}</strong></div>)}</div><div className="finding-summary"><div><span className="finding-total">67</span><span>total findings</span></div><div className="severity-bars">{findingsBySeverity.map((finding) => <div key={finding.name} style={{ width: `${finding.value}%`, background: finding.color }} />)}</div><div className="severity-labels">{findingsBySeverity.map((finding) => <span key={finding.name}>{finding.name} {finding.value}</span>)}</div></div></article></section><footer><span><span className="pulse-dot" /> DEMO / SIMULATED DATA</span><span>Skytrace Operations Console • v0.1.0</span></footer>
      </div></main>
  </div>
}

function NavGroup({ label, items, activePage, navigate, live = false }: { label: string; items: readonly (readonly [typeof LayoutDashboard, string])[]; activePage: string; navigate: (page: string) => void; live?: boolean }) {
  return <><p className="nav-label">{label}</p><nav>{items.map(([Icon, item]) => <button key={item} className={activePage === item ? 'nav-item active' : 'nav-item'} onClick={() => navigate(item)}><Icon size={17} />{item}{live && item === 'Live monitoring' && <span className="live-indicator" />}</button>)}</nav></>
}

function PanelHeading({ title, eyebrow, subtitle, badge, icon }: { title: string; eyebrow?: string; subtitle?: string; badge?: string; icon?: React.ReactNode }) {
  return <div className="panel-heading"><div>{eyebrow && <div className="title-with-status"><span className="live-dot" /> {eyebrow}</div>}<h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{badge ? <span className="live-badge">{badge}</span> : icon}</div>
}

function Metric({ icon, label, value, accent = false }: { icon: React.ReactNode; label: string; value: string; accent?: boolean }) {
  return <div className="metric"><span className="metric-icon">{icon}</span><span className="metric-label">{label}</span><strong className={accent ? 'battery-value' : ''}>{value}</strong></div>
}

export default App
