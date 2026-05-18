import { useState } from "react"
import { useNavigate } from "react-router-dom"


export function Login() {
    const navigate = useNavigate()

    const [loginError, setLoginError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [userData, setUserData] = useState({
        login: '',
        password: ''
    })

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const userVerification = async (e) => {
        e.preventDefault()
        let isValid = true

        if (!userData.login.trim()) {
            setLoginError('Введите логин')
            isValid = false
        } else setLoginError('')

        if (!userData.password.trim()) {
            setPasswordError('Введите пароль')
            isValid = false
        } else setPasswordError('')

        if (!isValid) return

        let response = await fetch(`http://localhost:3000/api/login?login=${userData.login}&password=${userData.password}`);
        let data = await response.json()

        if (data.result) {
            localStorage.setItem('userId', data.userId)
            localStorage.setItem('role', data.role)
            if (data.role === 'admin') {
                navigate('/admin')
            }
            else {
                navigate('/home')
            }
        }
        else {
            alert(data.message)
        }
    }

    const regGo = (e) => {
        e.preventDefault()
        navigate('/')
    }

    return (
        <div>
            <form onSubmit={userVerification}>
                <input type="text" name="login" placeholder="Логин" onChange={handleChange} value={userData.login} />
                {loginError && <p style={{color:'red'}}>{loginError}</p>}
                <input type="password" name="password" placeholder="Пароль" onChange={handleChange} value={userData.password} />
                {passwordError && <p style={{color:'red'}}>{passwordError}</p>}
                <button type="submit" className="btn">Войти</button>
            </form>
            <button onClick={regGo} className="btn">Зарегестрироваться</button>
        </div>
    )
}