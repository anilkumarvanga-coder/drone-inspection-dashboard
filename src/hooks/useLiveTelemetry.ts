import { useEffect, useState } from 'react'

export interface Telemetry {
  timestamp: string
  latitude: number
  longitude: number
  altitude: number
  speed: number
  heading: number
  battery: number
}

const route = [
  { latitude: 17.385, longitude: 78.4867 },
  { latitude: 17.386, longitude: 78.488 },
  { latitude: 17.3875, longitude: 78.4895 },
  { latitude: 17.389, longitude: 78.491 },
  { latitude: 17.3905, longitude: 78.4925 },
]

const initialTelemetry: Telemetry = {
  timestamp: new Date().toISOString(), latitude: route[0].latitude, longitude: route[0].longitude,
  altitude: 84, speed: 12.4, heading: 142, battery: 72,
}

export function useLiveTelemetry() {
  const [telemetry, setTelemetry] = useState(initialTelemetry)
  const [flightPath, setFlightPath] = useState(route.slice(0, 1))
  const [isLive, setIsLive] = useState(true)
  const [routeIndex, setRouteIndex] = useState(0)
  const [history, setHistory] = useState(() => [{ ...initialTelemetry, time: 'Now' }])

  useEffect(() => {
    if (!isLive) return undefined
    const timer = window.setInterval(() => {
      setRouteIndex((currentIndex) => {
        const nextIndex = (currentIndex + 1) % route.length
        const point = route[nextIndex]
        const nextTelemetry = {
          timestamp: new Date().toISOString(), ...point,
          altitude: Math.round(78 + Math.random() * 18), speed: Number((10 + Math.random() * 4).toFixed(1)),
          heading: (135 + Math.round(Math.random() * 24)) % 360, battery: Math.max(18, Number((telemetry.battery - 0.08).toFixed(1))),
        }
        setTelemetry(nextTelemetry)
        setFlightPath((path) => [...path, point].slice(-12))
        setHistory((points) => [...points, { ...nextTelemetry, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }].slice(-12))
        return nextIndex
      })
    }, 1800)
    return () => window.clearInterval(timer)
  }, [isLive, telemetry.battery])

  const resetFlight = () => {
    setTelemetry(initialTelemetry)
    setFlightPath(route.slice(0, 1))
    setHistory([{ ...initialTelemetry, time: 'Now' }])
    setRouteIndex(0)
    setIsLive(false)
  }

  return { telemetry, flightPath, history, isLive, routeIndex, startFlight: () => setIsLive(true), pauseFlight: () => setIsLive(false), stopFlight: () => setIsLive(false), resetFlight }
}
