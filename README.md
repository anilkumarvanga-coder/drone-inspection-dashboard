# Skytrace Drone Inspection Dashboard

A responsive React + TypeScript demo for drone monitoring and infrastructure inspection operations. It uses local mock data only and clearly labels simulated telemetry.

## Run locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Current demo slice

- Responsive enterprise operations-console layout
- Project selector with five fictional projects
- KPI cards, flight activity, asset summary, and severity breakdown
- Simulated FLT-024 mission with bounded telemetry history
- Start/resume, pause, stop, and reset flight controls
- Live altitude and speed chart powered by Recharts
- Mobile navigation drawer and desktop sidebar
- Explicit `DEMO ENVIRONMENT` and `SIMULATED LIVE` indicators

## Structure

- `src/data/mockData.ts`: service-ready mock domain data
- `src/hooks/useLiveTelemetry.ts`: bounded timer-based telemetry simulator
- `src/App.tsx`: dashboard composition and interaction wiring
- `src/index.css`: responsive visual system

The mock data and telemetry hook are isolated so they can later be replaced by API, WebSocket, or MQTT-backed services without coupling the UI to transport details.

## Demo limitations

This is not a drone-control system. It has no authentication, backend, live map provider, real telemetry, image pipeline, or PDF generation yet. The map surface is a local visual prototype for the first dashboard slice.
