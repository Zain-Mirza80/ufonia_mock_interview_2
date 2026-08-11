import type { Callback, CallbackStatus } from '../types'
import { StatusBadge } from './StatusBadge'

interface CallbackCardProps {
  callback: Callback
  onStatusChange: (id: number, status: CallbackStatus) => void
}

export function CallbackCard({ callback, onStatusChange }: CallbackCardProps) {
  return (
    <article className="card">
      <div className="card-header">
        <div>
          <h2>{callback.patient_name}</h2>
          <p className="muted">{callback.phone_number}</p>
        </div>
        <StatusBadge status={callback.status} />
      </div>

      <p>{callback.reason}</p>

      <div className="meta-row">
        <span className={`priority priority-${callback.priority}`}>{callback.priority}</span>
        <span>Due {callback.due_date}</span>
      </div>

      <p className="muted">Assigned to: {callback.assigned_to ?? 'Unassigned'}</p>

      <div className="actions">
        {callback.status === 'waiting' && (
          <button onClick={() => onStatusChange(callback.id, 'in_progress')}>Start callback</button>
        )}
        {callback.status !== 'completed' && (
          <button className="secondary" onClick={() => onStatusChange(callback.id, 'completed')}>
            Mark complete
          </button>
        )}
      </div>
    </article>
  )
}
