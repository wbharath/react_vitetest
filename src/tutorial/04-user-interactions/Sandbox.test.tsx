import { fireEvent, logRoles, render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import Sandbox from './Sandbox'

describe('04-user-interactions', () => {
  test('Screen Debug', () => {
    screen.debug()
    const { container } = render(<Sandbox />)
    logRoles(container)
  })
  test('should increment and decrement count using fireEvent', () => {
    render(<Sandbox />)
    const increaseButton = screen.getByRole('button', { name: /increase/i })
    const decreaseButton = screen.getByRole('button', { name: /decrease/i })
    expect(screen.getByText(/Count:0/i)).toBeInTheDocument()

    fireEvent.click(increaseButton)
    expect(screen.getByText(/Count:1/i)).toBeInTheDocument()

    fireEvent.click(decreaseButton)
    expect(screen.getByText(/Count:0/i)).toBeInTheDocument()
  })

  test('should increment and decrement count using userEvent', async () => {
    render(<Sandbox />)
    const user = userEvent.setup()
    const increaseButton = screen.getByRole('button', { name: /increase/i })
    const decreaseButton = screen.getByRole('button', { name: /decrease/i })
    expect(screen.getByText(/Count:0/i)).toBeInTheDocument()

    // unlike fireEvent we need to use await for userEvent

    await user.click(increaseButton)
    expect(screen.getByText(/Count:1/i)).toBeInTheDocument()

    await user.click(decreaseButton)
    expect(screen.getByText(/Count:0/i)).toBeInTheDocument()
  })

  test('toggles btw like and unlike button when clicked', async () => {
    render(<Sandbox />)
    const user = userEvent.setup()
    const unlikeButton = screen.getByRole('button', { name: 'unlike button' })
    expect(unlikeButton).toBeInTheDocument()

    expect(
      screen.queryByRole('button', { name: 'like button' })
    ).not.toBeInTheDocument()
    await userEvent.click(unlikeButton)
    const likeButton = screen.getByRole('button', { name: 'like button' })
    expect(likeButton).toBeInTheDocument()

    expect(
      screen.queryByRole('button', { name: 'unlike button' })
    ).not.toBeInTheDocument()  
  })
})
