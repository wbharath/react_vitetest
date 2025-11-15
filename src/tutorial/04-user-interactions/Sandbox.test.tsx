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
  test('should increment and decrement count using fireEvent',()=>{
    render(<Sandbox/>)
    const increaseButton = screen.getByRole('button',{name:/increase/i})
    const decreaseButton = screen.getByRole('button', { name: /decrease/i })
    expect(screen.getByText(/Count:0/i)).toBeInTheDocument()

    fireEvent.click(increaseButton)
    expect(screen.getByText(/Count:1/i)).toBeInTheDocument()

    fireEvent.click(decreaseButton)
    expect(screen.getByText(/Count:0/i)).toBeInTheDocument()

    


  })
})
