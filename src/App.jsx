import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/terminal' element={<Home />}></Route>
      <Route path='/experience/:slug' element={<Home />}></Route>
      <Route path='/projects/:slug' element={<Home />}></Route>
    </Routes>
  )
}

export default App
