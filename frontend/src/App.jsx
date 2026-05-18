import { Reg } from './components/Reg.jsx'
import { Home } from './components/Home.jsx'
import { Login } from './components/Login.jsx'
import { Admin } from './components/Admin.jsx'
import { NewRequest } from './components/NewRequest.jsx'
import { Routes, Route } from 'react-router-dom'
import './App.css'


export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Reg />} />
            <Route path='/home' element={<Home />} />
            <Route path='/admin' element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/new_request" element={<NewRequest />} />
        </Routes>
    )
}