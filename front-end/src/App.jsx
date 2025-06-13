import { useState } from 'react'
import './App.css'
import Home from './Home'
import MyTree from './MyTree'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Home />

      {/* <MyTree/> */}
    </>
  )
}

export default App
