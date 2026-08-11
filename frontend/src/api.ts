import type { Callback, CallbackUpdate } from './types'

const API_BASE = 'http://localhost:8000'

export async function fetchCallbacks(): Promise<Callback[]> {
  const response = await fetch(`${API_BASE}/callbacks`)
  if (!response.ok) {
    throw new Error('Could not load callbacks')
  }
  return response.json()
}

export async function updateCallback(id: number, update: CallbackUpdate): Promise<Callback> {
  const response = await fetch(`${API_BASE}/callbacks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(update),
  })

  if (!response.ok) {
    throw new Error('Could not update callback')
  }

  return response.json()
}
