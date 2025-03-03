// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import AdminLayouts from './layouts/AdminLayout'
import { Listener } from './pages/Listener'
// import AdminLayouts from './layouts/AdminLayout'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<AdminLayouts><Home /></AdminLayouts>} />
          <Route path="/listener" element={<AdminLayouts><Listener /></AdminLayouts>} />
          <Route path='/' element = {<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
