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

  test('should show email error if email is invalid', async()=>{
    const {emailInputElement, submitButton} = getFormElements()

    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument()

    await user.type(emailInputElement, 'invalid')
    await user.click(submitButton)
    expect(screen.getByText(/Invalid email/i)).toBeInTheDocument()

  

  })

   test('should show password error if password is less than 5 characters', async () => {
     const { emailInputElement, submitButton, passwordInputElement } = getFormElements()

     expect(screen.queryByText(/Password must be at least5 characters/i)).not.toBeInTheDocument()

     await user.type(emailInputElement, 'test@test.com')
     await user.type(passwordInputElement, 'brad')
     await user.click(submitButton)
     expect(screen.getByText(/Password must be at least5 characters/i)).toBeInTheDocument()
   })

   test('should show password error if passwords dont match', async () => {
     const { emailInputElement, submitButton, passwordInputElement, confirmPasswordInputElement } =
       getFormElements()

       const errorMsg = /Passwords do not match/i

     expect(
       screen.queryByText(errorMsg)
     ).not.toBeInTheDocument()

     await user.type(emailInputElement, 'test@test.com')
     await user.type(passwordInputElement, 'bradwaj')
     await user.type(confirmPasswordInputElement, 'notbradwaj')

     await user.click(submitButton)
     expect(
       screen.getByText(errorMsg)
     ).toBeInTheDocument()
   })

   test('valid inputs show no error', async () => {
     const {
       emailInputElement,
       submitButton,
       passwordInputElement,
       confirmPasswordInputElement
     } = getFormElements()

    

     await user.type(emailInputElement, 'test@test.com')
     await user.type(passwordInputElement, 'bradwaj')
     await user.type(confirmPasswordInputElement, 'bradwaj')
     await user.click(submitButton)

     expect(screen.queryByText(/Invalid email/i)).not.toBeInTheDocument()
     expect(screen.queryByText(/Password must be at least5 characters/i)).not.toBeInTheDocument()
     expect(screen.queryByText(/Passwords do not match/i)).not.toBeInTheDocument()


     expect(emailInputElement).toHaveValue('')
     expect(passwordInputElement).toHaveValue('')
     expect(confirmPasswordInputElement).toHaveValue('')

   })



})
