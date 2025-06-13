import { createContext, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './Home'
import MyTree from './MyTree'

export const Context = createContext();

function App() {
  const [id, setId] = useState(0)

  return (
    <Router>
      <Context.Provider value={{ id, setId }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tree" element={id ? <MyTree /> : <Navigate to="/" />} />
        </Routes>
      </Context.Provider>
    </Router>
  )
}

export default App
