import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function Reg() {
    const navigate = useNavigate()

    const [newUser, setNewUser] = useState({
        full_name: '',
        phone: '',
        email: '',
        login: '',
        password: ''
    })

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const addUser = async (e) => {
        
        e.preventDefault()
        let response = await fetch('http://localhost:3000/api/regis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newUser)
        });

        let data = await response.json();

        if (data.result) {
            alert(data.message)
            localStorage.setItem('userId', data.userId)
            localStorage.setItem('role', data.role)
            navigate('/home')
        }
        else {
            alert(data.message)
        }
    }

    const autoGo = (e) => {
        e.preventDefault()
        navigate('/login')
    }
    
    return (
        <div>
            <h1>Регистрация</h1>
            <form onSubmit={addUser}>
                <input type="text" placeholder="Введите ФИО" name="full_name" onChange={handleChange} value={newUser.full_name} />
                <input type="text" placeholder="Введите номер телефона" name="phone" onChange={handleChange} value={newUser.phone} />
                <input type="email" placeholder="Введите email" name="email" onChange={handleChange} value={newUser.email} />
                <input type="text" placeholder="Придумайте логин" name="login" onChange={handleChange} value={newUser.login} />
                <input type="password" placeholder="Придумайте пароль" name="password" onChange={handleChange} value={newUser.password} />
                <button type="submit">Зарегистрироваться</button>
            </form>
            <p>Уже зарегестрированы?</p>
            <button onClick={autoGo}>Войти</button>
        </div>
    )
}