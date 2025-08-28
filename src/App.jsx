import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { SignIn } from './features/signin/SignIn'
import { Layout } from './layout/Layout'
import { Dashboard } from './pages/Dashboard'
import { Robot } from './pages/Robot'
import { Report } from './pages/Report'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/signin"></Navigate>} ></Route>
          <Route path='/signin' element={<SignIn/>} ></Route>
          <Route path='/' element={<Layout/>}>
            <Route path='dashboard' element={<Dashboard/>}></Route>
            <Route path='robot' element={<Robot/>}></Route>
            <Route path='report' element={<Report/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
