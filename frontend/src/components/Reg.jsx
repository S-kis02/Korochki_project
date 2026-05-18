import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function Reg() {
    const navigate = useNavigate()

    const [loginError, setLoginError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [fullNameError, setFullNameError] = useState('')

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
        let isValid = true

        if (!/^[a-zA-Z0-9]{6,}$/.test(newUser.login)) {
            setLoginError('Логин: латиница или цифры, не менее 6 символов')
            isValid = false
        } else setLoginError('')

        if (newUser.password.length < 8) {
            setPasswordError('Пароль не менее 8 символов')
            isValid = false
        } else setPasswordError('')

        if (!/^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(newUser.phone)) {
            setPhoneError('Телефон: 8(XXX)XXX-XX-XX')
            isValid = false
        } else setPhoneError('')

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
            setEmailError('Некорректный email')
            isValid = false
        } else setEmailError('')

        if (!newUser.full_name.trim()) {
            setFullNameError('Введите ФИО')
            isValid = false
        } else setFullNameError('')

        if (!isValid) return

        let response = await fetch('http://localhost:3000/api/regis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newUser)
        });

        let data = await response.json();

        if (data.result) {
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
                {fullNameError && <p style={{ color: 'red' }}>{fullNameError}</p>}

                <input type="text" placeholder="8(XXX)XXX-XX-XX" name="phone" onChange={handleChange} value={newUser.phone} />
                {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}

                <input type="email" placeholder="Введите email" name="email" onChange={handleChange} value={newUser.email} />
                {emailError && <p style={{ color: 'red' }}>{emailError}</p>}

                <input type="text" placeholder="Придумайте логин" name="login" onChange={handleChange} value={newUser.login} />
                {loginError && <p style={{ color: 'red' }}>{loginError}</p>}

                <input type="password" placeholder="Придумайте пароль" name="password" onChange={handleChange} value={newUser.password} />
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                <button type="submit" className="btn">Зарегистрироваться</button>
            </form>
            <p>Уже зарегистрированы?</p>
            <button onClick={autoGo} className="btn">Войти</button>
        </div>
    )
}