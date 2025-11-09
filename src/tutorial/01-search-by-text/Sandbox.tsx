import { useEffect, useState } from 'react'

const Sandbox = () => {
  const [showMessage, setShowMessage] = useState(false)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <h1>ReactTesting Library Example</h1>
      <p>You can search me with regular expression: 123-456-7890</p>
      {showError && <p>Error Message</p>}
      <ul>
        <li>Item 1</li>
        <li>Item 1</li>
        <li>Item 1</li>
        
      </ul>
      {showMessage && <p>Async message</p>}
    </div>
  )
}
export default Sandbox
