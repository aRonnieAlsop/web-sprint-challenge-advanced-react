import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import AppFunctional from './AppFunctional'

test('renders without errors', () => {
  render(<AppFunctional />)
})

test('typing in the input field changes its value', async () => {
  const { getByPlaceholderText } = render(<AppFunctional />)
  const emailInput = getByPlaceholderText('type email')
  fireEvent.change(emailInput, { target: { value: 'testing@out.com'} })
  
  await waitFor(() => {
    expect(emailInput.value).toBe('testing@out.com')
  })
})


test('sanity', () => {
  expect(true).toBe(true)
})
