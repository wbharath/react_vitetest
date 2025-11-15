import { useEffect, useState } from 'react'
const Sandbox = () => {
  const [showAsyncButton, setShowAsyncButton] = useState(false)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAsyncButton(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>
      {/* headings */}
      <h1>Main Heading</h1>
      <h2>Sub Heading</h2>
      {/* image */}
      <img src="example.jpg" alt="Example" />
      {/* buttons */}
      <button>Click me</button>
      <button>Submit</button>
      <button>Cancel</button>
      {/* queryByRole example */}
      {showError && <button>Error</button>}
      {/* findByRole example */}
      {showAsyncButton && <button>Async Button</button>}
    </div>
  )
}
export default Sandbox
