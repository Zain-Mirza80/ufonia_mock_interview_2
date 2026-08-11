import type { CallbackStatus } from '../types'

export function StatusBadge({ status }: { status: CallbackStatus }) {
  return <span className={`badge badge-${status}`}>{status.replace('_', ' ')}</span>
}
