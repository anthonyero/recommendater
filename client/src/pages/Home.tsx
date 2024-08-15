import { useState } from 'react';

const Home = () => {
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
			<div className="card">

	          <button onClick={() => setCount((count) => count + 1)}>
	            count is {count}
	          </button>
	          <p>
	            Edit <code>src/App.tsx</code> and save to test HMR
	          </p>
	        </div>
	        <button onClick={() => testRequest('api/text')}>API test</button>
	        <p>{testData}</p>
		</>
	)
}

export default Home;