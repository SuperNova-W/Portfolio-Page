import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <>
     <div>
      <main>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
      </Routes>
      </main>
     </div>
    </>
  )
}

export default App
