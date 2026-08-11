// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { CallbackCard } from './CallbackCard'
import type { Callback } from '../types'

const callback: Callback = {
  id: 10,
  patient_name: 'Test Patient',
  phone_number: '0000000010',
  reason: 'Test callback reason',
  priority: 'routine',
  due_date: '2026-08-15',
  status: 'waiting',
  assigned_to: null,
}

describe('CallbackCard', () => {
  it('shows the start action for a waiting callback', () => {
    render(<CallbackCard callback={callback} onStatusChange={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Start callback' })).toBeTruthy()
  })
})
