import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  interface textObject {
    text: string
  }
  const [count, setCount] = useState(0)
  const [testData, setTestData] = useState('')

  const testRequest = async (url: string): Promise<any> => {
    const options: object = {
      method: 'GET'
    }
    try {
      const response = await fetch(url, options) // Returns a response object with type, status, etc
      const data: textObject = await response.json() // Must use await otherwise we receive a undefined
      console.log(data.text)
      setTestData(data.text)
      return data

    } catch (err) {
        if (err) {
          return err
        }
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>RecommenDater</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={() => testRequest('api/text')}>API test</button>
      <p>{testData}</p>
    </>
  )
}

export default App
