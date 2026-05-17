import { Reg } from './components/Reg.jsx'
import { Login } from './components/Login.jsx'
import { Routes, Route } from 'react-router-dom'

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Reg />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}