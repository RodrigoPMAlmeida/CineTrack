import { useState } from 'react'
// import './App.css'
import  Cadastrar from'./pages/Cadastrar'
import Api from './pages/HomeApi'
import Teste from './pages/homeTeste'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Api/>
    </>
  )
}

export default App
