import { useState } from "react"
import { useNavigate } from "react-router-dom"


export function Login() {
    const navigate = useNavigate()

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
        let response = await fetch(`http://localhost:3000/api/login?login=${userData.login}&password=${userData.password}`);
        let data = await response.json()

        if (data.result) {
            alert(data.message)
            localStorage.setItem('userId', data.userId)
            localStorage.setItem('role', data.role)
            if (data.role === 'admin') {
                navigate('/admin')
            }
            else{
                navigate('/home')
            }
        }
        else{
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
                <input type="password" name="password" placeholder="Пароль" onChange={handleChange} value={userData.password} />
                <button type="submit">Войти</button>
            </form>
            <button onClick={regGo}>Зарегестрироваться</button>
        </div>
    )
}