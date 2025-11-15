import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'

import Sandbox from './Sandbox'

describe('Sandbox component', () => {
  test('test whether heading renders correctly', () => {
    render(<Sandbox />)
    const heading = screen.getByText('ReactTesting Library Example')

    expect(heading).toBeInTheDocument()
  })

  test('test whether paragraph with phone number renders correctly', () => {
    render(<Sandbox />)
    screen.debug()
    const phoneNumber = screen.getByText(/\d{3}-\d{3}-\d{4}/)

    expect(phoneNumber).toBeInTheDocument()
  })

  test('test whether error message initially absent',()=>{

    render(<Sandbox/>)

    const errorMessage = screen.queryByText('Error Message')

    expect(errorMessage).not.toBeInTheDocument()
  })

  test('test whether multiple list items render correctly', ()=>{

    render(<Sandbox/>)

    const listItems = screen.getAllByText('Item 1')

    expect(listItems).toHaveLength(3)
  })

  test('test whether async message appears after delay', async ()=>{
    render(<Sandbox/>)

    const asyncMessage = await screen.findByText('Async message')

    expect(asyncMessage).toBeInTheDocument()
  })
})
