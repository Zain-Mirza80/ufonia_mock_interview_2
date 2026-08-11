export type CallbackStatus = 'waiting' | 'in_progress' | 'completed'
export type CallbackPriority = 'routine' | 'urgent'

export interface Callback {
  id: number
  patient_name: string
  phone_number: string
  reason: string
  priority: CallbackPriority
  due_date: string
  status: CallbackStatus
  assigned_to: string | null
}

export interface CallbackUpdate {
  status?: CallbackStatus
  assigned_to?: string | null
  due_date?: string
}
