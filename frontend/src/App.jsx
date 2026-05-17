import { Reg } from './components/Reg.jsx'
import { Home } from './components/Home.jsx'
import { Login } from './components/Login.jsx'
import { Admin } from './components/Admin.jsx'
import { Routes, Route } from 'react-router-dom'

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Reg />} />
            <Route path='/home' element={<Home />}/>
            <Route path='/admin' element={<Admin />}/>
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}