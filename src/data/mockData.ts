export type ProjectStatus = 'active' | 'completed' | 'paused'
export type FlightStatus = 'live' | 'completed' | 'cancelled'

export interface Project {
  id: string
  name: string
  location: string
  status: ProjectStatus
  assetTypes: string[]
  assetCount: number
  lastFlight: string
}

export interface Flight {
  id: string
  project: string
  date: string
  status: FlightStatus
  duration: string
  distance: string
}

export const projects: Project[] = [
  { id: 'PRJ-005', name: 'Medak Solar Corridor', location: 'Medak, Telangana', status: 'active', assetTypes: ['Solar panels', 'Inverters', 'Substations'], assetCount: 4860, lastFlight: '18 Sep 2026' },
  { id: 'PRJ-001', name: 'Hyderabad Transmission Inspection', location: 'Hyderabad, Telangana', status: 'active', assetTypes: ['Transmission Lines', 'Electrical Poles', 'Bridges'], assetCount: 245, lastFlight: '18 Sep 2026' },
  { id: 'PRJ-002', name: 'Nalgonda Bridge Survey', location: 'Nalgonda, Telangana', status: 'active', assetTypes: ['Bridges', 'Roads'], assetCount: 18, lastFlight: '17 Sep 2026' },
  { id: 'PRJ-003', name: 'Warangal Land Mapping', location: 'Warangal, Telangana', status: 'completed', assetTypes: ['Land', 'Structures'], assetCount: 62, lastFlight: '12 Sep 2026' },
  { id: 'PRJ-004', name: 'Vijayawada Chimney Audit', location: 'Vijayawada, Andhra Pradesh', status: 'paused', assetTypes: ['Chimneys', 'Structures'], assetCount: 14, lastFlight: '05 Sep 2026' },
]

export const flights: Flight[] = [
  { id: 'FLT-024', project: 'Hyderabad Transmission Inspection', date: '18 Sep 2026', status: 'live', duration: '01:24:08', distance: '18.4 km' },
  { id: 'FLT-023', project: 'Hyderabad Transmission Inspection', date: '15 Sep 2026', status: 'completed', duration: '02:12:44', distance: '31.8 km' },
  { id: 'FLT-022', project: 'Nalgonda Bridge Survey', date: '10 Sep 2026', status: 'completed', duration: '00:48:19', distance: '7.2 km' },
  { id: 'FLT-021', project: 'Warangal Land Mapping', date: '12 Sep 2026', status: 'completed', duration: '01:36:50', distance: '24.6 km' },
  { id: 'FLT-020', project: 'Medak Solar Corridor', date: '18 Sep 2026', status: 'completed', duration: '01:18:32', distance: '22.4 km' },
  { id: 'FLT-019', project: 'Medak Solar Corridor', date: '14 Sep 2026', status: 'completed', duration: '01:42:08', distance: '29.7 km' },
  { id: 'FLT-018', project: 'Medak Solar Corridor', date: '08 Sep 2026', status: 'completed', duration: '00:56:44', distance: '14.1 km' },
]

export const assetSummary = [
  { label: 'Solar panels', value: '4,860', tone: 'teal' },
  { label: 'Inverters', value: '36', tone: 'amber' },
  { label: 'Substations', value: '8', tone: 'coral' },
  { label: 'Land coverage', value: '182 ha', tone: 'blue' },
]

export const findingsBySeverity = [
  { name: 'Critical', value: 3, color: '#d95c4f' },
  { name: 'High', value: 9, color: '#e89a3b' },
  { name: 'Medium', value: 24, color: '#dfc452' },
  { name: 'Low', value: 31, color: '#5ab6a1' },
]
