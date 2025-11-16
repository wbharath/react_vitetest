import { render, screen, logRoles } from '@testing-library/react'
import { test, expect } from 'vitest'
import userEvent, { UserEvent } from '@testing-library/user-event'
import Sandbox from '../../tutorial/05-form-testing/Sandbox'

const getFormElements = () => {
  const elements = {
    emailInputElement: screen.getByRole('textbox', { name: /email/i }),
    passwordInputElement: screen.getByLabelText('Password'),
    confirmPasswordInputElement: screen.getByLabelText('Confirm Password'),
    submitButton: screen.getByRole('button', { name: /submit/i })
  }
  return elements
}

describe('05-form-testing', () => {
  // runs before each testcase
  let user: UserEvent
  beforeEach(() => {
    user = userEvent.setup()
    render(<Sandbox />)
    // console.log('Hello world')
  })
  test('input should be initially empty', () => {
    // const {container} = render(<Sandbox/>)
    // screen.debug()
    // logRoles(container)

    const {
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement
    } = getFormElements()

    expect(emailInputElement).toHaveValue('')

    expect(passwordInputElement).toHaveValue('')

    expect(confirmPasswordInputElement).toHaveValue('')
  })
  test('should be able to type in the input', async () => {
    const {
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement
    } = getFormElements()

    await user.type(emailInputElement, 'test@test.com')
    expect(emailInputElement).toHaveValue('test@test.com')

    await user.type(passwordInputElement, 'Machoman')
    expect(passwordInputElement).toHaveValue('Machoman')

    await user.type(confirmPasswordInputElement, 'Machoman')
    expect(confirmPasswordInputElement).toHaveValue('Machoman')
  })
})
