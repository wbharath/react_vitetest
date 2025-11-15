import { logRoles, render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import Sandbox from './Sandbox'

describe('03-search-by-role', () => {
  test('renders nav and navigation links', () => {
    const { container } = render(<Sandbox />)
    // you can see alll the DOM elements you have used in your component
    logRoles(container)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    // you cna specifically mention the name of the link or else use getAllByRole
    expect(screen.getByRole('link', { name: 'Home' }))
  })

  test('renders heading with correct hierarchy', () => {
    render(<Sandbox />)
    expect(
      screen.getByRole('heading', { name: 'Main Heading', level: 1 })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Sub Heading', level: 2 })
    ).toBeInTheDocument()
  })

  test('renders image with alt text', () => {
    render(<Sandbox />)
    expect(screen.getByRole('img', { name: 'Example' })).toBeInTheDocument()
  })

  test('renders initial buttons', () => {
    render(<Sandbox />)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  test('error button is not initially visible', () => {
    render(<Sandbox />)
    expect(
      screen.queryByRole('button', { name: 'Error' })
    ).not.toBeInTheDocument()
  })

  test('async button appears after delay', async () => {
    render(<Sandbox />)
    const buttonName = /async button/i
    expect(
      screen.queryByRole('button', { name: buttonName })
    ).not.toBeInTheDocument()

    const asyncButton = await screen.findByRole('button', { name: buttonName })
    expect(asyncButton).toBeInTheDocument()
  })
})
