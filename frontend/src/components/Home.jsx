import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function Home() {
    const navigate = useNavigate()
    const [requests, setRequests] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        const fetchRequests = async () => {
            let response = await fetch(`http://localhost:3000/api/requests?id_user=${userId}`)
            let data = await response.json();

            if (data.result) {
                setRequests(data.requests)
                setMessage('')
            }
            else{
                setRequests([])
                setMessage(data.message)
            }
        }
        fetchRequests()
    }, [])

    const newRequest = (e) =>{
        e.preventDefault()
        navigate('/new_request')
    }

    const exit = (e) =>{
        e.preventDefault()
        navigate('/')
    }
    return (
        <div>
            <button onClick={exit}>Выйти</button>
            <h1>Вы вошли!</h1>
            <p>{message}</p>
            {requests.length > 0 && (<table border='1'>
                <thead>
                    <tr><th>Курс</th><th>Дата</th><th>Статус</th></tr>
                </thead>
                <tbody>
                    {requests.map(req => (
                        <tr key={req.id_request}>
                            <td>{req.course_name}</td>
                            <td>{req.start_date ? new Date(req.start_date).toLocaleDateString('ru-RU') : 'Не указана'}</td>
                            <td>{req.status_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>)}
            <button onClick={newRequest}>Добавить заявку</button>
        </div>
    )
}