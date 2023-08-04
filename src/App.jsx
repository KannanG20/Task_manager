import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import { DarkModeProvider } from './context/DarkMode'
import AddTask from './pages/AddTask'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {

  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/add' element={<ProtectedRoute><AddTask/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  )
}

export default App
