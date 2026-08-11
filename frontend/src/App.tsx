import { useEffect, useState } from 'react'
import { fetchCallbacks, updateCallback } from './api'
import { CallbackCard } from './components/CallbackCard'
import type { Callback, CallbackStatus } from './types'
import './styles.css'

export default function App() {
  const [callbacks, setCallbacks] = useState<Callback[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCallbacks()
      .then(setCallbacks)
      .catch((err) => setError(err instanceof Error ? err.message : 'Something went wrong'))
      .finally(() => setLoading(false))
  }, [])

  async function handleStatusChange(id: number, status: CallbackStatus) {
    const updated = await updateCallback(id, { status })
    setCallbacks((current) => current.map((item) => (item.id === id ? updated : item)))
  }

  if (loading) {
    return <main className="page"><p>Loading callback queue…</p></main>
  }

  if (error) {
    return <main className="page"><p className="error">{error}</p></main>
  }

  const openCallbacks = callbacks.filter((item) => item.status !== 'completed')
  const urgentOpen = openCallbacks.filter((item) => item.priority === 'urgent').length

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Clinical operations</p>
          <h1>Post-discharge callback queue</h1>
          <p className="muted">Track outstanding patient callbacks and their current status.</p>
        </div>
        <div className="summary">
          <strong>{openCallbacks.length}</strong>
          <span>open</span>
          <strong>{urgentOpen}</strong>
          <span>urgent</span>
        </div>
      </header>

      <section className="grid">
        {callbacks.map((callback) => (
          <CallbackCard key={callback.id} callback={callback} onStatusChange={handleStatusChange} />
        ))}
      </section>
    </main>
  )
}
