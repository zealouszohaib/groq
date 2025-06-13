import { createContext, useState } from 'react'
import './App.css'
import Home from './Home'
import MyTree from './MyTree'

export const Context = createContext();

function App() {
  const [id, setId] = useState(0)

  return (
    <>

      <Context.Provider value={{ id, setId }}>

        <Home />
        <MyTree/>
      </Context.Provider>

      {/* <MyTree/> */}
    </>
  )
}

export default App
